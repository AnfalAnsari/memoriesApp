import axios from 'axios';
import { API_URL } from '../constants';

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
    const token = JSON.parse(localStorage.getItem('profile'))?.token;
    req.headers['authorization'] = `Bearer ${token}`;
    return req;
}, (error) => console.log(error))

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`posts/${id}`);
export const fetchPostsBySearch = (searchQuery, tags) => API.get(`/posts/search?searchQuery=${searchQuery}&tags=${tags.join(",")}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, newPost) => API.patch(`posts/${id}`, newPost);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`posts/likePost/${id}`);


export const signIn = (user) => API.post('/user/signin', user);
export const signUp = (user) => API.post('/user/signup', user);
