import React from "react";

const Post = React.memo(({ post, onDelete }) => {
  return (
    <div
      key={post.id}
      style={{
        border: "1px solid #ddd",
        margin: "1rem 0",
        padding: "1rem"
      }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
});

export default Post;
