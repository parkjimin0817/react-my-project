import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Wrapper from '../../components/common/Wrapper';

const Login = () => {
  return (
    <Wrapper>
      <LoginForm>
        <Lable>아이디</Lable>
        <Input type="text" />

        <Lable>비밀번호</Lable>
        <Input type="password" />

        <Button color="tomato">로그인</Button>
      </LoginForm>
    </Wrapper>
  );
};

export default Login;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 300px;
  padding: 10px;
  border: 1px solid lightblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Lable = styled.label`
  text-align: left;
  width: 200px;
  font-size: 18px;
  padding: 20px 0 0 0;
`;

const Input = styled.input`
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
`;
