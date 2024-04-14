import { ButtonProps } from "react-daisyui";
import { Button as DaisyButton } from "react-daisyui";

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, onClick, disabled, startIcon } = props;
  return (
    <DaisyButton
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
      {...props}
    >
      {children}
    </DaisyButton>
  );
};
