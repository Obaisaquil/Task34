# Mongoose Reference App

A full-stack web application demonstrating how to reference one Mongoose schema from another using MongoDB, Express.js, React, and Node.js.

The application allows users to create accounts, publish posts, and view posts along with the information of their respective authors using Mongoose `populate()`.

## Features

### Backend
- MongoDB connection using Mongoose.
- User schema with name and email.
- Post schema with title, content, and User reference.
- Create new users.
- Create posts linked to users.
- Retrieve all users.
- Retrieve all posts with populated user information.

### Frontend
- React-based user interface.
- Form to register users.
- Form to create posts.
- Dropdown to select a user when creating a post.
- Display all posts with author name and email.
- Axios integration for API requests.
- Responsive dark-themed UI.

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling and referencing |
| Axios | API requests |
| CSS | Styling |
| Vite | Frontend development server |

## Project Structure

```text
mongoose-reference-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── .env
    └── package.json
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd mongoose-reference-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a new user |
| GET | `/users` | Retrieve all users |
| POST | `/posts` | Create a new post |
| GET | `/posts` | Retrieve all posts with user details |

## Example API Requests

### Create User

**POST** `/users`

```json
{
  "name": "Obais",
  "email": "obais@example.com"
}
```

### Create Post

**POST** `/posts`

```json
{
  "title": "Learning Mongoose",
  "content": "Learning schema references and populate.",
  "userId": "YOUR_USER_ID"
}
```

### Retrieve Posts

**GET** `/posts`

The response includes post information and the associated user's name and email.

## Mongoose Referencing

The Post schema references the User schema using an ObjectId:

```javascript
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
```

To retrieve the associated user information, we use:

```javascript
const posts = await Post.find()
    .populate("user", "name email");
```

The `populate()` method replaces the referenced User ID with the corresponding user information.

## Learning Outcomes

- Understanding MongoDB and Mongoose.
- Creating and connecting multiple schemas.
- Understanding ObjectId references.
- Using Mongoose `populate()`.
- Building REST APIs using Express.js.
- Connecting React with a Node.js backend.
- Sending API requests using Axios.
- Working with MongoDB Atlas.

## Author

**Obais Aquil**

Full Stack Development Project

---

⭐ If you find this project useful, consider giving it a star on GitHub.
