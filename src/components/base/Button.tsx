import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary";

type ButtonSizes = "xs" | "sm" | "base" | "lg" | "xl";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSizes;
  isFullWidth?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const {
    isFullWidth = false,
    text,
    size = "base",
    type = "button",
    variant = "primary",
    href,
    className,
    ...rest
  } = props;

  const commonStyles =
    "font-medium rounded-lg focus-visible:ring-4 focus-visible:outline-none inline-block flex justify-center items-center";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm dark:bg-primary-600 dark:hover:bg-primary-700",
  };

  const textSizes: Record<ButtonSizes, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-sm",
    lg: "text-base",
    xl: "text-base",
  };

  const sizes: Record<ButtonSizes, string> = {
    xs: "py-2 px-3",
    sm: "py-2 px-3",
    base: "py-2.5 px-5",
    lg: "py-3 px-5",
    xl: "py-3.5 px-6",
  };

  const buttonStyles = twMerge(
    commonStyles,
    styles[variant],
    textSizes[size],
    sizes[size],
    isFullWidth && "w-full text-center",
    className
  );

  const inner = <>{text}</>;

  if (href && href.startsWith("http")) {
    return (
      <a
        {...(rest as any)}
        target="_blank"
        rel="noopener"
        href={href}
        className={buttonStyles}
      >
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <Link {...(rest as any)} href={href} className={buttonStyles}>
        {inner}
      </Link>
    );
  }

  return (
    <button {...(rest as any)} type={type} className={buttonStyles}>
      {inner}
    </button>
  );
};
