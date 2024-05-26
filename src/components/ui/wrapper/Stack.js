import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGsapAnimation } from '../../animation/AnimationGsap';

const StackDiv = styled.div`
  gap: ${props => props.$spacing || "10px"};
  width: ${props =>
    props.$width === "100%"
      ? "100%"
      : props.$width === "classic"
        ? "auto"
        : "auto"};
  display: flex;
  flex-direction: ${props => (props.$direction === "column" ? "column" : "row")};
  align-items: ${props => (props.$align === "center" ? "center" : "")};
  justify-content: ${props => props.$justify || "start"};
  ${props => props.$separator && "border-bottom: 1px solid var(--grey-color);"}
  ${props => props.$separator && `margin-bottom: 10px;`} /* Condition pour le margin-bottom */
  ${props => props.$separator && `padding-bottom: 10px;`} /* Condition pour le padding-bottom */
`;

function Stack({ direction, align, justify, children, width, spacing, animate, animationType, separator }) {
  useGsapAnimation();
  const refs = useRef();

  useEffect(() => {
    const animate = async () => {
      // Attendre que gsapAnimations soit défini
      while (!window.gsapAnimations) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (animationType && refs.current) {
        const animateFunction = window.gsapAnimations[animationType];
        if (animateFunction) {
          animateFunction(refs.current);
        }
      }
    };

    animate();
  }, [animationType]);

  return (
    <StackDiv
      $direction={direction}
      $align={align}
      $justify={justify}
      $width={width}
      $spacing={spacing}
      $animate={animate}
      $separator={separator}
      ref={refs}
    >
      {children}
    </StackDiv>
  );
}

export default Stack;
