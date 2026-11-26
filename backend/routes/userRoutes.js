
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// POST - Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({
            name,
            email
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET - Retrieve all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
