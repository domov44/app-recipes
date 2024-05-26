import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
padding: 100px 0px;
max-width: 1100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

function Section({ children }) {
    return (
        <SectionContainer>
            {children}
        </SectionContainer>
    );
}

export default Section;