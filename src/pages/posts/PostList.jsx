import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/common/Wrapper';
import usePostStore from '../../store/PostStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import useUserStore from '../../store/UserStore';
import { useLocation } from 'react-router-dom';

const PostList = () => {
  const { posts, isLoading, error, getPosts } = usePostStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredPosts, setFilteredPosts] = useState([]);

  // 게시글 데이터를 가져오는 함수 호출
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search')?.toLowerCase() || '';

    if (searchQuery) {
      setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredPosts(posts);
    }
  }, [location.search, posts]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleWritePostClick = () => {
    navigate('/posts/create'); // 작성 페이지로 이동
  };

  if (isLoading) return <Wrapper>로딩 중...</Wrapper>;
  if (error) return <Wrapper>에러 발생: {error}</Wrapper>;

  return (
    <Wrapper>
      {currentUser && (
        <ButtonContainer>
          <Button onClick={handleWritePostClick}>게시글 작성하기</Button>
        </ButtonContainer>
      )}
      <PostListContainer>
        <h2>게시글</h2>
        {filteredPosts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <PostTable>
            <thead>
              <tr>
                <TableHeader>제목</TableHeader>
                <TableHeader>작성자</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <PostRow key={post.id} onClick={() => handlePostClick(post.id)}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.userId}</TableCell>
                </PostRow>
              ))}
            </tbody>
          </PostTable>
        )}
      </PostListContainer>
    </Wrapper>
  );
};

export default PostList;

const PostListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
`;

const PostTable = styled.table`
  width: 600px;
  border-collapse: collapse;
  border-radius: 10px;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f4f4f4;
  text-align: left;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const PostRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #6bccec;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #555;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 20px 50px 0 0;
  text-align: right;
  margin-bottom: 20px;
`;
