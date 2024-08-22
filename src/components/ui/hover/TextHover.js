import React from 'react';
import styled from "styled-components";

export default function TextHover({children, text, onClick}) {
  return (
    <ContainerClickable onClick={onClick}>
      {children}
      <OverlayText>
        {text}
      </OverlayText>
    </ContainerClickable>
  )
}

const OverlayText = styled.div`
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    opacity: 0;

    &:hover {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;

const ContainerClickable = styled.div`
    position: relative;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
