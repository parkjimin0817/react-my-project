import React from 'react';
import styled from 'styled-components';

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;

const StyledWrapper = styled.div`
  padding-left: 200px;
`;
