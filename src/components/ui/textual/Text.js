import React from "react";
import styled from "styled-components";

const TextComponent = styled.p`
  font-family: ${(props) =>
    props.$fontfamily === "light"
      ? "var(--text-font-light)"
      : props.$fontfamily === "medium"
      ? "var(--text-font)"
      : props.$fontfamily === "semi-bold"
      ? "var(--text-font-bold)"
      : "var(--text-font-light)"};
  color: ${(props) =>
    props.$variant === "default"
      ? "var(--paragraph)"
      : props.$variant === "colored"
        ? "var(--main-color)"
        : props.$variant === "contrasted"
        ? "var(--color-title)"
        : props.$variant === "white"
          ? "#fff"
          : "var(--paragraph)"};
  text-align: ${props => (props.$textalign)};
  max-width: ${props => (props.$maxwidth)};
  font-size: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "16px";
      case "md":
        return "18px";
      case "lg":
        return "20px";
      default:
        return "18px";
    }
  }};
`;

const Text = ({ variant, textalign, size, className, id, onClick, children, maxwidth, fontfamily, ...restProps }) => {
  return (
    <TextComponent $textalign={textalign} $variant={variant} $size={size} $maxwidth={maxwidth} $fontfamily={fontfamily} {...restProps}>
      {children}
    </TextComponent>
  );
};

export default Text;
