import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    const isCustomToken = token.length < 500;

    let decodedData;

    if (isCustomToken) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
    }
    else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
    }

    next();
}


