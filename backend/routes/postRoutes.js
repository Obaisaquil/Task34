const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// POST - Create a new post
router.post("/", async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const post = await Post.create({
            title,
            content,
            user: userId
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET - Retrieve all posts with user information
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            total: posts.length,
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;