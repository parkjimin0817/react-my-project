import React, { useState } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/common/Wrapper';
import Button from '../../components/common/Button';
import usePostStore from '../../store/PostStore';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const PostCreate = () => {
  const navigate = useNavigate();
  const { createPost } = usePostStore();
  const { currentUser } = useUserStore();

  const [formData, setFormData] = useState({
    userId: currentUser.userId,
    title: '',
    content: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    createPost(formData);
    navigate('/posts');
  };

  return (
    <Wrapper>
      <DetailWrapper as="form" onSubmit={handleSubmit}>
        <ImagePreview>
          {formData.img ? <PostImage src={formData.img} alt="Preview" /> : <Placeholder>이미지 미리보기</Placeholder>}
        </ImagePreview>

        <PostContent>
          <Input name="userId" value={currentUser.userId} placeholder="작성자" disabled />
          <Divider />
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="제목을 입력하세요" />
          <Divider />
          <Textarea name="content" value={formData.content} onChange={handleChange} placeholder="내용을 입력하세요" />
          <Divider />
          <Input name="img" value={formData.img} onChange={handleChange} placeholder="이미지 URL (선택)" />
        </PostContent>
      </DetailWrapper>

      <div>
        <SubmitButton type="button" onClick={handleSubmit}>
          등록하기
        </SubmitButton>
      </div>
    </Wrapper>
  );
};

export default PostCreate;

const DetailWrapper = styled.form`
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

const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #999;
  text-align: center;
`;

const Placeholder = styled.span`
  padding: 10px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-height: 150px;
  resize: vertical;
  white-space: pre-wrap;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const SubmitButton = styled(Button)`
  background-color: #add8e690;
  color: black;
  &:hover {
    background-color: lightblue;
  }
`;
