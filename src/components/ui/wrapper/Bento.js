import React from 'react';
import styled from 'styled-components';

const BentoDiv = styled.div`
  overflow: hidden;
  position: ${props => props.$position || "" };
  right: ${props => props.$right || "" };
  left: ${props => props.$left || "" };
  top: ${props => props.$top || "" };
  bottom: ${props => props.$bottom || "" };
  gap: 10px;
  display: flex;
  flex-direction: ${props => (props.$direction === "row" ? "row" : "column")};
  justify-content: center;
  align-items: ${props => (props.$align === "center" ? "center" : "")};
  width: ${props => (props.$width ? props.$width : "100%")};
  background: ${props => (props.$highlight ? "var(--secondary-bg-color)" : "")};
  padding: ${props => (props.$padding ? props.$padding : "24px")};
  border-radius: ${props => (props.$highlight ? "10px" : "")};
  box-shadow: ${props => (props.$highlight ? "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.03) 0px 12px 24px -4px;" : "")};
`;

function Bento({ children, align, direction, highlight, width, padding, position, right, left, top, bottom, }) {
  return (
    <BentoDiv $align={align} $direction={direction} $highlight={highlight} $width={width} $padding={padding} $position={position} $right={right} $left={left} $bottom={bottom} $top={top}>
      {children}
    </BentoDiv>
  );
}

export default Bento;