import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const StyledLinkButton = styled(Link)`
color: var(--paragraph);
position:relative;
width: fit-content;
display: inline-block;

&:before{
    content: '';
    width: 100%;
    height: 2px;
    border-radius: 15px;
    background: var(--main-color);
    position: absolute;
    bottom: -3px;
    transition: 0.3s ease-in-out;
}

&:hover:before{
        width: 0%;
    }
`;

const TextLink = ({ href, children }) => (
    <StyledLinkButton href={href}>
        {children}
    </StyledLinkButton>
);

export default TextLink;
