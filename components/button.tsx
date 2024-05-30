import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Button = ({
  fullWidth,
  type = "button",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cx(
        buttonProps.className,
        [
          "text-lg",
          "px-4",
          "py-3",
          "border-2",
          "border-neutral-900",
          "outline-0",
          "focus-visible:border-blue-600",
          "rounded-full",
          "bg-neutral-900",
          "text-white",
          "hover:bg-neutral-700",
          "transition-colors",
        ],
        {
          "w-full": fullWidth,
        }
      )}
      {...buttonProps}
    />
  );
};
