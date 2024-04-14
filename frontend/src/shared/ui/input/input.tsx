import classNames from "classnames";
import { Input as DaisyInput, InputProps } from "react-daisyui";

interface IProps extends InputProps {
  addClassNames?: string;
  inputClassNames?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = ({
  inputClassNames,
  addClassNames,
  label,
  error,
  required,
  ...props
}: IProps): JSX.Element => {
  return (
    <div className={addClassNames}>
      {label ? (
        <div className="label">
          <span className="label-text font-semibold">
            {label}
            {required ? <span className="text-red-500">*</span> : undefined}
          </span>
        </div>
      ) : undefined}
      <DaisyInput
        {...props}
        className={classNames(inputClassNames, {
          "input-error": error,
        })}
      />
      {error ? (
        <div className="label">
          <span className="label-text text-red-500">{error}</span>
        </div>
      ) : undefined}
    </div>
  );
};
