import React, { useState, Suspense, lazy, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_POSTS, ADD_POST, DELETE_POST } from "../graphql";

const Post = lazy(() => import("../components/Post"));

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }]
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }]
  });



  const handleAddPost = (e) => {
    e.preventDefault();
    addPost({ variables: { input: { title, content } } });
    setTitle("");
    setContent("");
  };

  const handleDeletePost = useCallback((id) => {
    deletePost({ variables: { id } });
  }, [deletePost]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>GraphQL Blog</h1>

      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>

      <h2>Posts</h2>
      <Suspense fallback={<div>Loading posts...</div>}>
        {data.getAllPosts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </Suspense>
    </div>
  );
};

export default App;
