import React, { useState } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useUserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { signin, error } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(formData);
    if (!error) {
      alert('회원가입 완료');
      setFormData({
        name: '',
        id: '',
        email: '',
        password: '',
      }); // 여기서 초기화
      navigate('/user');
    }
  };
  return (
    <Wrapper>
      <div>
        <h2>Sign In</h2>
        <SignInForm onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          <Label>ID</Label>
          <Input type="text" name="id" value={formData.id} onChange={handleChange} />
          <Label>E-MAIL</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          <Label>PASSWORD</Label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />

          <Button color="tomato">Sign In</Button>
        </SignInForm>
      </div>
    </Wrapper>
  );
};

export default SignIn;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 500px;
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
