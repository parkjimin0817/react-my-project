import React from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';

const Loader = () => {
  return (
    <Wrapper>
      <SpinnerWrapper>
        <BounceLoader size={100} color="#6a68ec" />
        <p>불러오는 중...</p>
      </SpinnerWrapper>
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  flex-direction: column;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: black;
`;
