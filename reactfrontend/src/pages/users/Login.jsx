import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Wrapper from '../../components/common/Wrapper';
import Input from '../../components/common/Input';
import useUserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const shcema = yup
  .object({
    userId: yup.string().required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })
  .required();

const Login = () => {
  const { login, currentUser, error } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shcema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data) => {
    const success = await login(data.userId, data.password);
    if (!success) {
      alert(error || '아이디나 비밀번호가 옳지 않습니다. 다시 시도해주세요.');
      reset();
    }
  };

  return (
    <Wrapper>
      <div>
        <h2>Log In</h2>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Label>ID</Label>
          <Input type="text" {...register('userId')} />
          <ErrorMsg $visible={!!errors.userId}>{errors.userId?.message || ' '}</ErrorMsg>
          <Label>PASSWORD</Label>
          <Input type="password" {...register('password')} />
          <ErrorMsg $visible={!!errors.passowrd}>{errors.passowrd?.message || ' '}</ErrorMsg>
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

const Label = styled.label`
  text-align: left;
  width: 200px;
  font-size: 18px;
  padding: 20px 0 0 0;
`;

const ErrorMsg = styled.p`
  display: block;
  color: red;
  font-size: 12px;
  height: 15px; /* 적당한 높이 지정 */
  margin: 0;
  padding: 0;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;
