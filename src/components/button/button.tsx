import { FC, ReactElement } from "react";
import "./button.css";

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit";
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  className,
  ...props
}): ReactElement => (
  <button className={`button-card ${className}`} {...props} />
);
