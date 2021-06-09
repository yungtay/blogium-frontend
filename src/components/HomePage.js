import React, { useState, useEffect } from "react";
import PostList from "./PostList/PostList";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promisse = axios.get("http://localhost:5000/posts");
    promisse.then((response) => setPosts(response.data));
    promisse.catch(() => alert("Não foi possível buscar os posts"));
  }, []);

  return <PostList name="Daily stories" posts={posts} />;
}
