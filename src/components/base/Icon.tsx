import { FC } from "react";
import * as icons from "react-icons/md";
import { twMerge } from "tailwind-merge";

export type IconNames = keyof typeof icons;

export interface IconProps {
  name: IconNames;
  size?: number;
  className?: string;
}

export const Icon: FC<IconProps> = (props) => {
  const { name, size = 24, className, ...rest } = props;
  const Icon = icons[name];

  return (
    <Icon
      {...rest}
      size={size}
      className={twMerge(
        "text-gray-400 transition duration-75 dark:text-gray-400",
        className
      )}
    />
  );
};
