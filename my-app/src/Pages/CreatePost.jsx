// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CreatePost({ setPosts, user }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const navigate = useNavigate();

//   // Memastikan pengguna sudah login sebelum submit (walaupun sudah ada guard di App.jsx)
//   if (!user) {
//     return (
//       <main className="content-container">
//         <div className="content-box">
//           <h2>Access Denied</h2>
//           <p>Please login to create a post.</p>
//         </div>
//       </main>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (title.trim() === "" || content.trim() === "") {
//       alert("Please fill in both the title and content fields.");
//       return;
//     }

//     const newPost = {
//       id: Date.now(), // Simple unique ID
//       title: title.trim(),
//       author: user.username, // Use the logged-in user's username
//       content: content.trim(),
//       comments: [], // New posts start with no comments
//     };

//     // Use functional update to ensure we use the latest state
//     setPosts(prevPosts => [newPost, ...prevPosts]); 

//     // Reset form fields
//     setTitle("");
//     setContent("");

//     // Navigate back to the forum page
//     navigate("/forum");
//   };

//   return (
//     <main className="content-container">
//       <div className="content-box forum-section post-detail-section">
//         <h2 className="forum-title">Create New Discussion Post</h2>

//         <form onSubmit={handleSubmit} className="create-post-form">
//           <div className="form-group">
//             <label htmlFor="title">Post Title</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter a descriptive title for your discussion"
//               className="login-input" // PERUBAHAN: Menggunakan class yang sudah ada di CSS
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="content">Content</label>
//             <textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Share your thoughts, questions, or ideas here..."
//               rows="10"
//               className="login-input" // PERUBAHAN: Menggunakan class yang sudah ada di CSS
//               required
//             />
//           </div>

//           <button type="submit" className="tierlist-btn">
//             Publish Post
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // axios instance

export default function CreatePost({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // memastikan user login
  if (!user) {
    return (
      <main className="content-container">
        <div className="content-box">
          <h2>Access Denied</h2>
          <p>Please login to create a post.</p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill in both the title and content fields.");
      return;
    }

    try {
      // Kirim ke backend
      await api.post("/posts", {
        title: title.trim(),
        content: content.trim(),
        author: user.username,
      });

      // Kosongkan input
      setTitle("");
      setContent("");

      // Redirect
      navigate("/forum");

    } catch (err) {
      console.error("❌ Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <main className="content-container">
      <div className="content-box forum-section post-detail-section">
        <h2 className="forum-title">Create New Discussion Post</h2>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your discussion"
              className="login-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or ideas here..."
              rows="10"
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="tierlist-btn">
            Publish Post
          </button>
        </form>
      </div>
    </main>
  );
}
