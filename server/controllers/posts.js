import mongoose from "mongoose";
import Post from "../model/post.js";


export const getPost = async (req, res) => {
    const { id } = req.params;

    try {

        const post = await Post.findOne({ _id: id });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const getPosts = async (req, res) => {


    try {

        const LIMIT = 6;
        const { page } = req.query;
        const startIndex = (Number(page) - 1) * LIMIT;
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        const total = await Post.countDocuments({});
        const numberOfPages = Math.ceil(total / LIMIT);
        res.status(200).json({ numberOfPages: numberOfPages, posts: posts });

    } catch (error) {
        res.status(404).json(error)
    }

}

export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try {

        let title;

        searchQuery === '' ? title = '' : title = new RegExp(searchQuery, "i");

        const post = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error })
    }


}

export const createPost = async (req, res) => {

    if (!req.userId) return res.status(403).json({ message: "Authentication is required" })

    try {

        const post = new Post(req.body);

        const result = await post.save();

        res.status(201).json(post);

    } catch (error) {

        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;

    if (!req.userId) return res.status(403).json({ message: "Authentication is required" })

    try {


        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Post with given Id not found" });

        const { title, message, selectedFile, creator, tags } = req.body;
        let updatedPost = { title, message, selectedFile, creator, tags };
        updatedPost = await Post.findOneAndUpdate({ _id: id }, updatedPost, { new: true });

        res.status(200).json(updatedPost);

    } catch (error) {
        console.log(error);
    }

}

export const deletePost = async (req, res) => {

    if (!req.userId) return res.status(403).json({ message: "Authentication is required" })

    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Not a valid Id: " + id);

        const result = await Post.deleteOne({ _id: id });
        result.deletedCount === 1 ? res.status(200).json({ message: "Successful Deletion" }) : res.status(500).json({ message: "Server Error" })

    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = async (req, res) => {

    if (!req.userId) return res.status(403).json({ message: "Authentication is required" })

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Not a valid Id: " + id);

        const post = await Post.findById(id);

        const index = post.likes.findIndex((id) => id === req.userId)

        if (index == -1) {
            post.likes.push(req.userId);
        }
        else {
            post.likes = post.likes.filter((id) => id !== req.userId);
        }

        const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, { new: true })

        res.status(200).send(updatedPost);

    } catch (error) {
        console.log(error);
    }
}