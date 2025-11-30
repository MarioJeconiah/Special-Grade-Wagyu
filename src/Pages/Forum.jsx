import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forum({ user, comments, setComments }) {
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const commentsPerPage = 10;

  // EDIT POPUP STATE
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const currentComments = comments.slice(
    (page - 1) * commentsPerPage,
    page * commentsPerPage
  );

  const addComment = () => {
    if (newComment.trim()) {
      setComments([{ nickname: user.username, text: newComment }, ...comments]);
      setNewComment("");
      setPage(1);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (index) => {
    setEditIndex(index);
    setEditText(comments[index].text);
  };

  // SAVE EDITED COMMENT
  const saveEdit = () => {
    const updated = [...comments];
    updated[editIndex].text = editText;
    setComments(updated);
    closeEditModal();
  };

  const closeEditModal = () => {
    setEditIndex(null);
    setEditText("");
  };

  const deleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <main className="content-container">
      <section className="content-box forum-section">
        <h2 className="forum-title">Community Discussion</h2>

        {/* POST INPUT */}
        <div className="forum-input-area">
          <textarea
            className="forum-textarea"
            rows="3"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="tierlist-btn" onClick={addComment}>
            Post
          </button>
        </div>

        {/* COMMENT LIST */}
        <div className="forum-comments">
          {currentComments.map((c, i) => {
            const globalIndex = (page - 1) * commentsPerPage + i;

            return (
              <div key={globalIndex} className="comment">
                <div className="comment-right">
                  <strong className="comment-nickname">{c.nickname}</strong>
                  <p className="comment-meta">Posted just now</p>
                  <p className="comment-text">{c.text}</p>

                  {/* SHOW ACTION ONLY IF OWNER */}
                  {user.username === c.nickname && (
                    <div className="comment-actions">
                      <button onClick={() => openEditModal(globalIndex)}>Edit</button>
                      <button onClick={() => deleteComment(globalIndex)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>◀</button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active-page" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>▶</button>
        </div>
      </section>

      {/* ⬇ EDIT COMMENT POPUP (FULL PAGE, TENGAH) */}
      {editIndex !== null && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <span className="edit-close" onClick={closeEditModal}>×</span>
            <h2>Edit Comment</h2>

            <textarea
              className="edit-textarea"
              rows="4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <button className="tierlist-btn" onClick={saveEdit}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
