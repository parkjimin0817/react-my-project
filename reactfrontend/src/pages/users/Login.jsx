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
  const { login, currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log('로그인 성공', currentUser);
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(userId, password);

    if (success) {
      // currentUser는 useEffect에서 감지해서 이동 처리함
      console.log('로그인 성공');
    } else {
      alert('아이디나 비밀번호가 옳지 않습니다. 다시 시도해 주세요.');
      setUserId('');
      setPassword('');
    }
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
