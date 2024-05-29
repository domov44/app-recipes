import React from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

const IconButtonComponent = styled.button`
line-height: 1;
gap:5px;
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
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
  cursor: pointer;
  transition: 0.3s;

  ${({ $variant, $disable }) => {
        if ($variant === "action" && !$disable) {
            return css`
        background: var(--success-bg);
        color: var(--success-color);
        
        &:hover {
            background: var(--success-bg-darker);
        }

        &:active {
            background: var(--success-bg-darker);
        }
      `;
        } else if ($variant === "secondary-action" && !$disable) {
            return css`
            background: none;
            color:var(--colored-text);
        
        &:hover {
            background: var(--nav-bg-hover);
        }

        &:active {
            background: var(--nav-bg-active);
        }
      `;

        } else if ($variant === "basique" && !$disable) {
            return css`
            background: none;
            color:var(--paragraph);
        
        &:hover {
            background: var(--nav-bg-hover);
        }

        &:active {
            background: var(--nav-bg-active);
        }
      `;

        } else if ($variant === "danger" && !$disable) {
            return css`
            background: none;
            color:var(--error-color);
        
        &:hover {
            background: var(--error-bg);
        }

        &:active {
            background: var(--error-bg-darker);
        }
      `;
        } else if ($disable) {
            return css`
        cursor: default;
        background: none;
        color: var(--color-title);
        opacity: 0.2;
      `;
        }
    }}
`;

const IconButton = ({ type, variant, wtext, width, className, id, onClick, to, href, children, disable }) => {
    const Component = href || to ? Link : 'button';
    const linkProps = href ? { href } : { to };

    return (
        <IconButtonComponent
            as={Component}
            type={type ? (type === "input" ? ["button", "input"] : type) : "button"}
            $wtext={wtext}
            $variant={variant}
            $disable={disable}
            disabled={disable}
            $width={width}
            className={className ? `btn-component ${className}` : "btn-component"}
            id={id}
            onClick={!disable ? onClick : null}
            {...linkProps}
        >
            {children}
        </IconButtonComponent>
    );
};

export default IconButton;