import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 5% 0 5%;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.$variant === 'wsidebar' ? '280px' : '0px')};
  transition: 0.2s;

  @media (max-width: 1000px) {
      margin-left: ${props => (props.$variant === 'wsidebar' ? '0px' : '0px')};
    }
`;

function Main({ variant, children }) {
  return <MainContainer $variant={variant}>{children}</MainContainer>;
}

export default Main;