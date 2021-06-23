import styled from '@emotion/styled';
import React from 'react';

const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #fcba19;
  color: #003366;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-radius: 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
`;

export interface IButtonProps {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  return (
    <StyledButton onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
