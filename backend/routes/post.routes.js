import { Router } from "express";
import { addPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";


const router = Router();


router.get('/post', getPosts);

router.get("/:id", getPostById); // Get post by ID

router.post('/post', addPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;