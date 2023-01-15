import express from "express";
import { createPost, getPosts, updatePost, deletePost, likePost, getPostsBySearch, getPost } from "../controllers/posts.js";
import { auth } from '../middleware/auth.js'

const postRouter = express.Router();


postRouter.get('/', getPosts);
postRouter.get('/search', getPostsBySearch)
postRouter.get('/:id', getPost);
postRouter.post('/', auth, createPost);
postRouter.patch('/:id', auth, updatePost)
postRouter.delete('/:id', auth, deletePost);
postRouter.patch('/likePost/:id', auth, likePost);

export default postRouter;