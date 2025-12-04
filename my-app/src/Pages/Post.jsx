// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Post({ posts, user, setPosts }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const post = posts.find(p => p.id.toString() === id);

//   const [commentText, setCommentText] = useState("");

//   if (!post) {
//     return (
//       <main className="content-container">
//         <div className="content-box">
//           <h2 className="section-title">Post Not Found</h2>
//           <p>The discussion post you are looking for does not exist.</p>
//           <button className="forum-btn" onClick={() => navigate('/forum')}>
//             Go to Forum
//           </button>
//         </div>
//       </main>
//     );
//   }

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();

//     if (!user) {
//       alert("You must be logged in to comment.");
//       return;
//     }

//     if (commentText.trim() === "") return;

//     const newComment = {
//       id: Date.now(),
//       author: user.username,
//       text: commentText.trim(),
//       date: new Date().toLocaleDateString()
//     };

//     const updatedPosts = posts.map(p =>
//       p.id.toString() === id
//         ? { ...p, comments: [...p.comments, newComment] }
//         : p
//     );

//     setPosts(updatedPosts);
//     setCommentText("");
//   };

//   return (
//     <main className="content-container">
//       <div className="content-box post-detail-section">
        
//         <button className="forum-btn back-btn" onClick={() => navigate('/forum')}>
//           ← Back to Forum
//         </button>

//         <h2 className="section-title">{post.title}</h2>
//         <p className="post-meta">By {post.author}</p>

//         <div className="post-body">
//           <p className="post-text">{post.content}</p>
//         </div>

//         <hr className="divider" />

//         <h3 className="section-title small-title">
//           Comments ({post.comments.length})
//         </h3>

//         <div className="comment-list">
//           {post.comments.length === 0 ? (
//             <p className="empty-text">No comments yet. Be the first to start!</p>
//           ) : (
//             post.comments.slice().reverse().map((comment) => (
//               <div key={comment.id} className="comment-box">
//                 <p className="comment-author">
//                   {comment.author}
//                   <span className="comment-date">({comment.date})</span>
//                 </p>
//                 <p className="comment-text">{comment.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         <form onSubmit={handleCommentSubmit} className="comment-form">
//           <textarea
//             className="textarea-field"
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder={user ? "Write your comment..." : "You must be logged in to comment."}
//             disabled={!user}
//             rows="4"
//           />
//           <button type="submit" className="forum-btn" disabled={!user}>
//             Submit Comment
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // axios instance

export default function Post({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  // Fetch post + comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("❌ Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Jika loading
  if (loading) {
    return (
      <main className="content-container">
        <div className="content-box">
          <p style={{ color: "white", opacity: 0.8 }}>Loading post...</p>
        </div>
      </main>
    );
  }

  // Jika post tidak ditemukan
  if (!post) {
    return (
      <main className="content-container">
        <div className="content-box">
          <h2 className="section-title">Post Not Found</h2>
          <p>The discussion post you are looking for does not exist.</p>
          <button className="forum-btn" onClick={() => navigate("/forum")}>
            Go to Forum
          </button>
        </div>
      </main>
    );
  }

  // Kirim komentar ke backend
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    if (commentText.trim() === "") return;

    try {
      const res = await api.post("/comments", {
        post_id: id,
        user_id: user.id,
        text: commentText.trim(),
      });

      // Append comment baru ke UI
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));

      setCommentText("");
    } catch (err) {
      console.error("❌ Failed to submit comment:", err);
      alert("Failed to submit comment.");
    }
  };

  return (
    <main className="content-container">
      <div className="content-box post-detail-section">
        <button className="forum-btn back-btn" onClick={() => navigate("/forum")}>
          ← Back to Forum
        </button>

        <h2 className="section-title">{post.title}</h2>
        <p className="post-meta">By {post.author}</p>

        <div className="post-body">
          <p className="post-text">{post.content}</p>
        </div>

        <hr className="divider" />

        <h3 className="section-title small-title">
          Comments ({post.comments.length})
        </h3>

        <div className="comment-list">
          {post.comments.length === 0 ? (
            <p className="empty-text">No comments yet. Be the first to start!</p>
          ) : (
            post.comments
              .slice()
              .reverse()
              .map((comment) => (
                <div key={comment.id} className="comment-box">
                  <p className="comment-author">
                    {comment.author}
                    <span className="comment-date">
                      ({new Date(comment.createdAt).toLocaleDateString()})
                    </span>
                  </p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            className="textarea-field"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              user ? "Write your comment..." : "You must be logged in to comment."
            }
            disabled={!user}
            rows="4"
          />
          <button type="submit" className="forum-btn" disabled={!user}>
            Submit Comment
          </button>
        </form>
      </div>
    </main>
  );
}
