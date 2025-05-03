import React from 'react';
import styled from 'styled-components';

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;

const StyledWrapper = styled.div`
  position: fixed;
  top: 110px;
  width: 100%;
  height: calc(100% - 110px);

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;
