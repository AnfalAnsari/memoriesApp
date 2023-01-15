import { User } from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) return res.status(404).json({ message: "Account with this email Id dosen't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ name: user.name, email: user.email, id: user._id, }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: user, token: token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }


}

export const signUp = async (req, res) => {

    try {


        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ message: "Password field didnt matched" });

        const existingUser = await User.findOne({ email: email });

        if (existingUser) return res.status(400).json({ message: "User with given mail already exist" });
        console.log(existingUser);

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ name: `${firstName} ${lastName}`, email: email, password: hashedPassword });

        const result = await newUser.save();

        const token = jwt.sign({ name: newUser.name, email: newUser.email, id: newUser._id, }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: newUser, token: token });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

