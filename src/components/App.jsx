import React, {  useState } from "react";
import Header from "./Header";
import Post from "./Post";
import CreateArea from "./CreateArea";

function App() {
const [posts, setPosts] = useState([]);

  function addPost(newPost) {
    setPosts(prevPosts => {
      return [...prevPosts, newPost];
    });
  }

  function deletePost(id) {
    setPosts(prevPosts => {
      return prevPosts.filter((postItem, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addPost} />
      {posts.map((postItem, index) => {
        return (
          <Post
            key={index}
            id={index}
            title={postItem.title}
            content={postItem.content}
            onDelete={deletePost}
            gif={postItem.gif}
          />
        );
      })}
    </div>
  );
}

export default App;
