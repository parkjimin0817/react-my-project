import React from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';

const SignIn = () => {
  return (
    <Wrapper>
      <SignInForm></SignInForm>
    </Wrapper>
  );
};

export default SignIn;

const SignInForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 700px;
  padding: 10px;
  border: 1px solid lightblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;
