import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Wrapper from '../../components/common/Wrapper';
import Input from '../../components/common/Input';
import useUserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log('로그인 성공', currentUser);
      navigate('/');  // 홈으로 리다이렉트
    }
  }, [currentUser, navigate]); // currentUser가 바뀔 때마다 실행

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userId, password);  // 로그인 시도
  };

  return (
    <Wrapper>
      <div>
        <h2>Log In</h2>
        <LoginForm onSubmit={handleSubmit}>
          <Lable>ID</Lable>
          <Input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <Lable>PASSWORD</Lable>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Error>{error}</Error>}
          <Button type="submit" color="tomato">
            Log In
          </Button>
        </LoginForm>
      </div>
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
