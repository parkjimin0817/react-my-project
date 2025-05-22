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
  margin: 20px 0 0 0;
  width: 200px;
  background: ${({ color }) => color};
`;
