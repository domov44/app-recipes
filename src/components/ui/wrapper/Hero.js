import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 80px);
    width: 100%;
    margin-top: 80px;
    gap: ${props => props.$spacing || "30px"};
    padding:  ${props => props.$padding || ""};
`;

function Hero({ children, padding, spacing }) {
    return (
        <HeroContainer $padding={padding} $spacing={spacing}>
            {children}
        </HeroContainer>
    );
}

export default Hero;