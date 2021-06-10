import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5000/posts/${postId}`)
    promisse.then((response) => {
      setPost(response.data);
      setTitle(response.data.title);
      setCoverUrl(response.data.coverUrl);
      setContent(response.data.content);
    });
    promisse.catch(() => alert("Não foi possível carregar as informações do post"))
  }, [postId]);

  function onPostSaveButtonClick() {
    const promisse = axios.put(`http://localhost:5000/posts/${postId}`, {title, coverUrl, content})
    promisse.then(() => history.push(`/posts/${postId}`))
    promisse.catch(() => alert("Não foi possivel editar o post"))
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
