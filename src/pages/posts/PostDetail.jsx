import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/common/Wrapper';
import usePostStore from '../../store/PostStore';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useUserStore from '../../store/UserStore';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { postDetail, getPostDetail, isLoading, error, deletePost } = usePostStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    getPostDetail(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      await deletePost(id);
      navigate('/posts');
    }
  };
  if (isLoading) return <Wrapper>로딩 중...</Wrapper>;
  if (error) return <Wrapper>오류ff 발생: {error}</Wrapper>;
  if (!postDetail) return <Wrapper>게시글이 없습니다.</Wrapper>;

  return (
    <Wrapper>
      <DetailWrapper>
        {postDetail.img && <PostImage src={postDetail.img} alt="Post" />}
        <PostContent>
          <UserId>{postDetail.userId}</UserId>
          <Divider />
          <Title>{postDetail.title}</Title>
          <Divider />
          <Content>{postDetail.content}</Content>
        </PostContent>
      </DetailWrapper>

      <ButtonWrapper>
        {currentUser && currentUser.userId === postDetail.userId && (
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        )}
        <GoList onClick={() => navigate('/posts')}>목록 가기</GoList>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PostDetail;

const DetailWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const PostContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserId = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 16px;
`;

const Content = styled.p`
  font-size: 18px;
  color: #444;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const GoList = styled(Button)`
  background-color: #add8e690;
  margin-left: 10px;
  color: black;
  &:hover {
    background-color: lightblue;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  margin-right: 10px;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;
