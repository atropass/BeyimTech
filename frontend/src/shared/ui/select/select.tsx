import clsx from "classnames";
import { ChangeEventHandler } from "react";

interface Option<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  options: Option<T>[];
  value: T | T[];
  onChange: (value: T) => void;
  classNames?: string;
  helperText?: string;
  label?: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  classNames = "",
  label = "",
  helperText = "",
  disabled = false,
}: SelectProps<any>): JSX.Element => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };
  return (
    <>
      {label ? (
        <div className="label">
          <span className="label-text font-semibold">{label}</span>
        </div>
      ) : undefined}
      <select
        disabled={disabled}
        name=""
        value={value ?? helperText}
        id=""
        className={clsx(
          "rounded-lg border border-zinc-300 px-2 py-1 outline-none hover:bg-zinc-100",
          [classNames]
        )}
        onChange={handleChange}
      >
        {helperText && <option disabled>{helperText}</option>}{" "}
        {/* Add this line */}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
