import { FC, HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type TypographyStyling =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "leading"
  | "capture";
type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "small";
type TypographyVariant = "default" | "light" | "red";

export interface TypographyProps
  extends HTMLProps<HTMLParagraphElement | HTMLLabelElement> {
  styling?: TypographyStyling;
  variant?: TypographyVariant;
  as: TypographyTag;
  text?: string;
  isHidden?: boolean;
}

export const Typography: FC<TypographyProps> = (props) => {
  const {
    styling = "p",
    as = "p",
    variant = "default",
    text,
    isHidden,
    children,
    className,
    ...rest
  } = props;

  const Tag = as;

  const variants: Record<TypographyVariant, string> = {
    default: "text-black dark:text-white",
    light: "text-gray-500 dark:text-gray-400",
    red: "text-red-600 dark:text-red-500",
  };

  const styles: Record<TypographyStyling, string> = {
    h1: "text-5xl font-extrabold max-sm:text-3xl",
    h2: "text-4xl font-bold max-sm:text-2xl",
    h3: "text-3xl font-bold max-sm:text-xl",
    h4: "text-2xl font-bold max-sm:text-lg",
    h5: "text-xl font-bold",
    h6: "text-lg font-bold ",
    p: "font-light",
    leading: "text-lg font-light md:text-xl",
    capture: "text-xs",
  };

  return (
    <Tag
      {...(rest as any)}
      className={twMerge(
        variants[variant],
        styles[styling],
        isHidden && "sr-only",
        className
      )}
    >
      {children ? children : text}
    </Tag>
  );
};
