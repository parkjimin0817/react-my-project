import React, { useEffect } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import useUserStore from '../../store/UserStore';

const MyPage = () => {
  const { currentUser } = useUserStore();

  useEffect(() => {}, [currentUser]);

  return (
    <Wrapper>
      <div>
        <h2>My Page</h2>
        <MyPageForm>
          <Label>Name</Label>
          <Input type="text" value={currentUser?.name || ''} readOnly />

          <Label>ID</Label>
          <Input type="text" value={currentUser?.userId || ''} readOnly />

          <Label>E-MAIL</Label>
          <Input type="email" value={currentUser?.email || ''} readOnly />
          {/* 
          <Label>PASSWORD</Label>
          <Input type="password" value={currentUser?.password || ''} readOnly /> */}
        </MyPageForm>
      </div>
    </Wrapper>
  );
};

export default MyPage;

const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: auto;
  padding: 10px;
  border: 1px solid lightblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Label = styled.label`
  text-align: left;
  width: 200px;
  font-size: 18px;
  padding: 20px 0 0 0;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;
