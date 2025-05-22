import React from 'react';
import styled from 'styled-components';

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
`;
