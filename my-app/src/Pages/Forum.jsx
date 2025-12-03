import { NavLink } from "react-router-dom";

export default function Forum({ posts }) {
  return (
    <main className="content-container">
      <div className="content-box forum-section">
        <h2 className="forum-title">Community Discussion</h2>

        {/* Tombol Buat Post Baru */}
        <div style={{ marginBottom: "1.5rem" }}> {/* Menggunakan div untuk margin tombol */}
            <NavLink 
              to="/forum/create" 
              className="tierlist-btn" 
            >
              Create New Post
            </NavLink>
        </div>

        {/* Daftar Postingan */}
        {posts.length === 0 ? (
          <p style={{ color: "white", opacity: 0.8 }}>No posts yet. Be the first!</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <NavLink
                key={post.id}
                to={`/forum/post/${post.id}`}
                className="post-preview" // Menggunakan class .post-preview
              >
                <h3>{post.title}</h3>
                <p className="post-meta-preview">By {post.author} | Comments: {post.comments.length}</p>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Pagination (example placeholder) */}
      <div className="pagination">
        <button className="active-page">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </main>
  );
}