import React from 'react';
import styled from 'styled-components';

const Button = ({ children, color, ...props }) => {
  return (
    <StyledButton color={color} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  margin: 15px;
  width: 200px;
  background: ${({ color }) => color};
`;
