import React from 'react';
import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-left-color: var(--main-color);
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: ${rotateAnimation} 1s linear infinite;
`;

export default function ButtonLoading() {
    return (
        <LoadingSpinner />
    )
}