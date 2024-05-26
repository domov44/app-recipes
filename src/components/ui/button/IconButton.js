import React from "react";
import styled from "styled-components";
import Link from "next/link";

const IconButtonComponent = styled.button`
line-height: 1;
gap:5px;
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
    color: ${props =>
        props.$variant === "action"
            ? "var(--success-color)"
            : props.$variant === "secondary-action"
                ? "var(--colored-text)"
                : props.$variant === "basique"
                    ? "var(--paragraph)"
                    : props.$variant === "danger"
                        ? "var(--error-color)"
                        : "none"};
  background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg)"
            : props.$enable === "notactive"
                ? "none"
                : "none"};
  border:  none;
  padding: ${props =>
        props.$wtext === "yes"
            ? "10px 14px"
            : props.$wtext === "no"
                ? "10px"
                : "10px 14px"};
  font-size: 20px;
  border-radius: ${props =>
        props.$wtext === "yes"
            ? "5px"
            : props.$wtext === "no"
                ? "50%"
                : "5px"};
  filter: ${props =>
        props.$enable === "active"
            ? "none"
            : props.$enable === "notactive"
                ? "grayscale(100%);"
                : "none"};
  cursor: ${props =>
        props.$enable === "active"
            ? "pointer"
            : props.$enable === "notactive"
                ? "default"
                : "pointer"};
    opacity: ${props =>
        props.$enable === "active"
            ? "1"
            : props.$enable === "notactive"
                ? "0.5"
                : "1"};
  transition: 0.3s;

  &:hover{
    background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg-darker)"
            : props.$variant === "secondary-action"
                ? "var(--nav-bg-hover)"
                : props.$variant === "basique"
                    ? "var(--nav-bg-hover)"
                    : props.$enable === "notactive"
                        ? "none"
                        : props.$variant === "danger"
                            ? "var(--error-bg)"
                            : "none"};
  }

  &:active{
    background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg-darker)"
            : props.$variant === "secondary-action"
                ? "var(--nav-bg-active)"
                : props.$variant === "basique"
                    ? "var(--nav-bg-active)"
                    : props.$enable === "notactive"
                        ? "none"
                        : props.$variant === "danger"
                            ? "var(--error-bg-darker)"
                            : "none"};
  }
`;

const IconButton = ({ type, variant, enable, wtext, width, className, id, onClick, to, href, children }) => {
    const Component = href || to ? Link : 'button';
    const linkProps = href ? { href } : { to };

    return (
        <IconButtonComponent
            as={Component}
            type={type ? (type === "input" ? ["button", "input"] : type) : "button"}
            $wtext={wtext}
            $variant={variant}
            $enable={enable}
            $width={width}
            className={className ? `btn-component ${className}` : "btn-component"}
            id={id}
            onClick={onClick}
            {...linkProps}
        >
            {children}
        </IconButtonComponent>
    );
};

export default IconButton;