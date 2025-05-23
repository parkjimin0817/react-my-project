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
  id: yup.string().min(6, '아이디는 6글자 이상이어야 합니다.').required('ID를 입력하세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력하세요.'),
  password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
});

const SignIn = () => {
  const { signin } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const result = await signin(data);

    if (result.success) {
      alert(`${result.userId}님 회원가입이 완료되었습니다.`);
      reset();
      navigate('/user');
    } else {
      alert(`회원가입에 실패하였습니다 : ${result.message}`);
    }
  };

  return (
    <Wrapper>
      <div>
        <h2>Sign In</h2>
        <SignInForm onSubmit={handleSubmit(onSubmit)}>
          <Label>Name</Label>
          <Input type="text" {...register('name')} />
          <ErrorMsg $visible={!!errors.name}>{errors.name?.message || ' '}</ErrorMsg>

          <Label>ID</Label>
          <Input type="text" {...register('id')} />
          <ErrorMsg $visible={!!errors.id}>{errors.id?.message || ' '}</ErrorMsg>

          <Label>E-MAIL</Label>
          <Input type="email" {...register('email')} />
          <ErrorMsg $visible={!!errors.email}>{errors.email?.message || ' '}</ErrorMsg>

          <Label>PASSWORD</Label>
          <Input type="password" {...register('password')} />
          <ErrorMsg $visible={!!errors.password}>{errors.password?.message || ' '}</ErrorMsg>

          <Label>PASSWORD CONFIRM</Label>
          <Input type="password" {...register('passwordConfirm')} />
          <ErrorMsg $visible={!!errors.passwordConfirm}>{errors.passwordConfirm?.message || ' '}</ErrorMsg>

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
  height: 600px;
  padding: 10px;
  border: 1px solid lightblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Label = styled.label`
  text-align: left;
  width: 200px;
  font-size: 18px;
  padding: 12px 0 0 0;
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
