import React, { useState } from "react";
import styled, { css } from "styled-components";
import Link from 'next/link';
import ButtonLoading from "@/components/ButtonLoading";

const StyledComponent = styled.button`
  border: none;
  line-height: 1;
  text-align: center;
  position: ${props => props.$position || "relative"};
  top: ${props => props.$top || ""};
  right: ${props => props.$right || ""};
  bottom: ${props => props.$bottom || ""};
  left: ${props => props.$left || ""};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: ${props =>
    props.$width === "fit-content"
      ? "fit-content"
      : props.$width === "full-width"
        ? "100%"
        : "fit-content"};
  padding: 12px 16px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: 1.25s;
  z-index: ${props => props.$zindex || ""};

  ${({ $variant, $disable }) => {
    if ($variant === "primary" && !$disable) {
      return css`
        background-image: radial-gradient(circle at ${props => props.$mouseX}px ${props => props.$mouseY}px, var(--main-color), var(--secondary-color));
        background-size: 100% auto;
        color: #fff;
        
        &:hover {
          background-image: radial-gradient(circle at ${props => props.$mouseX}px ${props => props.$mouseY}px, var(--main-color), var(--secondary-color));
        }
      `;
    } else if ($variant === "secondary" && !$disable) {
      return css`
        background-color: var(--bg-color);
        border: 1px solid var(--color-title);
        color: var(--color-title);
        
        &:hover {
          background-color: var(--bg-color);
        }
      `;
    }

    else if ($disable) {
      return css`
        cursor: default;
        filter:grayscale(90%);
        background-color: var(--main-color);
        color: rgba(0, 0, 0, 0.5);

        &:hover {
          background-color: var(--main-color);
        }
      `;
    }
  }}
`;

const Button = ({ type, variant, width, className, id, onClick, position, zindex, top, right, bottom, left, href, children, disable, icon: Icon }) => {
  const [mousePosition, setMousePosition] = useState({ x: 267, y: 13 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const Component = href ? Link : 'button';

  return (
    <StyledComponent
      as={Component}
      type={type ? (type === "input" ? ["button", "input"] : type) : "button"}
      $variant={variant}
      $zindex={zindex}
      $width={width}
      $position={position}
      $top={top}
      $right={right}
      $disable={disable}
      $bottom={bottom}
      $left={left}
      className={className ? `btn-component ${className}` : "btn-component"}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      $mouseX={mousePosition.x}
      $mouseY={mousePosition.y}
      href={href}
    >
      {disable && <ButtonLoading />}
      {Icon && <Icon />}{children}
    </StyledComponent>
  );
};

export default Button;

