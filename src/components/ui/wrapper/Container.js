import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';

const ContainerDiv = styled.div`
gap:30px;
  width: ${props => props.$width || ""};
  max-width: ${props => props.$maxwidth || ""};
  display: flex;
  flex-direction: ${props => (props.$direction === "row" ? "row" : "column")};
  align-items: ${props => (props.$align === "center" ? "center" : "")};
  justify-content: ${props =>
    props.$justify === "center"
      ? "center"
      : props.$justify === "start"
        ? "start"
        : props.$justify === "space-between"
          ? "space-between"
          : "start"};

@media (max-width: 1000px) {
  flex-direction: ${props => (props.$responsive === "yes" ? "column" : "")};
    }
`;

function Container({ maxwidth, direction, align, justify, children, width, responsive }) {
  return (
    <ContainerDiv $responsive={responsive} $maxwidth={maxwidth} $direction={direction} $align={align} $justify={justify} $width={width}>
      {children}
    </ContainerDiv>
  );
}

export default Container;