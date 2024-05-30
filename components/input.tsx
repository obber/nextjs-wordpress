import { InputHTMLAttributes, forwardRef, useMemo } from "react";
import { createDOMId } from "../lib/dom";
import cx from "classnames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
  label?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, helperText, ...inputProps }: InputProps,
  ref
) {
  const formElementId = useMemo(() => {
    return id ?? createDOMId();
  }, [id]);
  return (
    <div className="flex flex-col gap-2">
      {label ? <label htmlFor={formElementId}>{label}</label> : null}
      <input
        className={cx(
          "text-lg",
          "px-6",
          "py-3",
          "rounded-full",
          "border-2",
          "border-gray-900",
          "bg-white",
          "outline-0",
          "hover:border-blue-600"
        )}
        ref={ref}
        {...inputProps}
      ></input>
      {helperText ? (
        <div className={cx("text-md", { "text-red-600": error })}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
});
