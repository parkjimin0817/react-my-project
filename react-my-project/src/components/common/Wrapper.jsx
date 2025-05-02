import React from 'react';
import styled from 'styled-components';

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;

const StyledWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 250px;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;
