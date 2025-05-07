import React from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useUserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력하세요.'),
  id: yup.string().required('ID를 입력하세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력하세요.'),
  password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
});

const SignIn = () => {
  const { signin, error } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await signin(data);
    if (!error) {
      alert('회원가입 완료');
      reset();
      navigate('/user');
    }
  };

  return (
    <Wrapper>
      <div>
        <h2>Sign In</h2>
        <SignInForm onSubmit={handleSubmit(onSubmit)}>
          <Label>Name</Label>
          <Input type="text" {...register('name')} />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}

          <Label>ID</Label>
          <Input type="text" {...register('id')} />
          {errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}

          <Label>E-MAIL</Label>
          <Input type="email" {...register('email')} />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}

          <Label>PASSWORD</Label>
          <Input type="password" {...register('password')} />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}

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
