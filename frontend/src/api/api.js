import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getUsers = () => API.get("/users");

export const createUser = (userData) =>
    API.post("/users", userData);

export const createPost = (postData) =>
    API.post("/posts", postData);

export const getPosts = () => API.get("/posts");