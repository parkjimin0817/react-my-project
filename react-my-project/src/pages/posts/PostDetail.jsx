import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/common/Wrapper';
import usePostStore from '../../store/PostStore';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { postDetail, getPostDetail, isLoading, error } = usePostStore();

  useEffect(() => {
    getPostDetail(id);
  }, [id]);

  if (isLoading) return <Wrapper>로딩 중...</Wrapper>;
  if (error) return <Wrapper>오류 발생: {error}</Wrapper>;
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

      <BackButtonWrapper>
        <GoList onClick={() => navigate('/posts')}>목록 가기</GoList>
      </BackButtonWrapper>
    </Wrapper>
  );
};

export default PostDetail;

// 스타일 컴포넌트

const DetailWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: row; // 사진과 글이 가로로 배치되도록 설정
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.img`
  width: 200px; // 사진 크기 조정
  height: 200px; // 정사각형
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px; // 사진과 글 사이 간격
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

const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const GoList = styled(Button)`
  background-color: #add8e690;
  color: black;
  &:hover {
    background-color: lightblue;
  }
`;
