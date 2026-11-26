import { useEffect, useState } from "react";
import {
    getUsers,
    createUser,
    createPost,
    getPosts
} from "./api/api";

import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch users and posts
    const loadData = async () => {
        try {
            const [userResponse, postResponse] = await Promise.all([
                getUsers(),
                getPosts()
            ]);

            setUsers(userResponse.data);
            setPosts(postResponse.data.posts);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load data");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Add User
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            setLoading(true);

            await createUser({
                name: userName,
                email: userEmail
            });

            setUserName("");
            setUserEmail("");

            setMessage("User added successfully!");
            await loadData();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    // Add Post
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            setLoading(true);

            await createPost({
                title: postTitle,
                content: postContent,
                userId: selectedUser
            });

            setPostTitle("");
            setPostContent("");
            setSelectedUser("");

            setMessage("Post added successfully!");
            await loadData();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to add post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            <header>
                <h1>Mongoose Reference App</h1>
                <p>Learn how Users and Posts are connected</p>
            </header>

            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            <main className="container">

                {/* User Form */}
                <section className="card">
                    <h2>Add New User</h2>

                    <form onSubmit={handleUserSubmit}>
                        <input
                            type="text"
                            placeholder="Enter user name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Please wait..." : "Add User"}
                        </button>
                    </form>

                    <p className="small">
                        Total Users: {users.length}
                    </p>
                </section>

                {/* Post Form */}
                <section className="card">
                    <h2>Create New Post</h2>

                    <form onSubmit={handlePostSubmit}>
                        <input
                            type="text"
                            placeholder="Enter post title"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Write your content"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            required
                        />

                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                        >
                            <option value="">Select a user</option>

                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            disabled={loading || users.length === 0}
                        >
                            {loading ? "Please wait..." : "Publish Post"}
                        </button>

                        {users.length === 0 && (
                            <p className="small">
                                Add a user before creating a post.
                            </p>
                        )}
                    </form>
                </section>

            </main>

            {/* Posts Display */}
            <section className="posts-section">
                <h2>All Posts</h2>
                <p className="small">Total Posts: {posts.length}</p>

                <div className="posts-grid">
                    {posts.length === 0 ? (
                        <p>No posts available. Create your first post!</p>
                    ) : (
                        posts.map((post) => (
                            <div className="post-card" key={post._id}>
                                <h3>{post.title}</h3>

                                <p>{post.content}</p>

                                <div className="author">
                                    <strong>Posted by:</strong>
                                    <p>
                                        {post.user
                                            ? post.user.name
                                            : "User unavailable"}
                                    </p>
                                    <small>
                                        {post.user?.email || ""}
                                    </small>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <footer>
                Built with React, Express, MongoDB and Mongoose
            </footer>

        </div>
    );
}

export default App;