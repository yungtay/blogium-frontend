import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import PreContent from '../../components/PreContent';
import PostImage from './PostImage';
import PostText from './PostText/PostText';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import PostComments from './PostComments/PostComments';
import axios from 'axios';

export default function PostShowPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5000/posts/${postId}`);
    promisse.then((response) => setPost(response.data));
    promisse.catch(() => alert("Não foi possível buscar os posts"));
  }, [postId]);

  function onEditButtonClick() {
    history.push(`/posts/${postId}/edit`);
  }

  function onDeleteButtonClick() {
    const promisse = axios.delete(`http://localhost:5000/posts/${postId}`);
    promisse.then(() => {
      alert("Post apagado");
      history.push("/");
    });
    promisse.catch(() => alert("Não foi possível deletar o post"));
  }

  if (!post) return <Spinner />;

  return (
    <main>
      <article>
        <section>
          <PostImage coverUrl={post.coverUrl} />
          <PreContent marginY="20" />
          <EditionContainer>
            <div>
              <Button
                style={{ color: 'orange', borderColor: 'orange', marginRight: 10 }}
                onClick={onEditButtonClick}
              >
                Edit
              </Button>
              <Button style={{ color: 'red', borderColor: 'red' }} onClick={onDeleteButtonClick}>
                Delete
              </Button>
            </div>
          </EditionContainer>
          <PostText post={post} />
          <PostComments postId={post.id} />
        </section>
      </article>
    </main>
  );
}

const EditionContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px 40px;
  max-width: 740px;
  display: flex;
  align-items: center;
  ${({ isAdmin }) => (isAdmin ? 'justify-content: space-between' : 'justify-content: flex-start')}
`;
