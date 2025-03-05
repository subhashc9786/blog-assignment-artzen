import { Posts } from "../models/post.model.js";

const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const addPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (![title, content, author].every((field) => typeof field === 'string' && field.trim() !== "")) {
            return res.status(400).json({ error: "All Fields are required" });
        }

        // Validate phone separately if it's supposed to be a number
        // if (!phone || typeof phone !== 'string' || phone.trim() === "") {
        //     return res.status(400).json({ error: "Phone number is required" });
        // }
        // const existingCustomer = await Posts.findOne({ email });
        // if (existingCustomer) {
        //     return res.status(409).json({ error: "Customer with this email already exists" });
        // }
        const newPosts = new Posts({ title, content, author });
        const posts = await newPosts.save();
        res.status(201).json({ posts, message: "Posts added Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updatePost = async (req, res) => {
    try {

        const { title, content, author } = req.body;
        const post = await Posts.findByIdAndUpdate(req.params.id, {
            title,
            content,
            author,
        });
        if (!post) {
            return res.status(404).json({ message: "Posts not found" });
        }
        res.status(200).json({ post, message: "Post updated Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const customer = await Posts.findByIdAndDelete(req.params.id);
        if (!customer)
            return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


const getPostById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
export { getPosts, addPost, updatePost, deletePost, getPostById };
