import React from "react";

type ActionButtonProps = {
  icon: JSX.Element;
  text: string;
  isOutlined: boolean;
  onClick?: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  isOutlined = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flex items-center rounded-full hover:opacity-75 ${
        isOutlined ? "border border-white" : ""
      } space-x-2 p-2`}
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{text}</span>
    </button>
  );
};
