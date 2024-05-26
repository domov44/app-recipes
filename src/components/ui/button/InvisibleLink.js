import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const StyledLinkButton = styled(Link)`
line-height: ${props => props.$lineheight || ""};
width: fit-content;
color:inherit;
`;

const InvisibleLink = ({ href, children, lineheight, onClick }) => (
    <StyledLinkButton href={href} $lineheight={lineheight} onClick={onClick}>
        {children}
    </StyledLinkButton>
);

export default InvisibleLink;

