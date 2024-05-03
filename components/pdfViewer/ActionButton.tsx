import React from "react";
import { Spinner } from "@chakra-ui/react";

type ActionButtonProps = {
  icon: JSX.Element;
  text: string;
  isOutlined: boolean;
  isLoading?: boolean; // Optional prop to handle loading state
  onClick?: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  isOutlined = false,
  isLoading = false, // Default loading state is false
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading} // Disable button when loading
      className={`flex items-center rounded-full hover:opacity-75 ${
        isOutlined ? "border border-white" : ""
      } space-x-2 p-2`}
    >
      <>
        {isLoading ? (
          <Spinner size="sm" /> // Display spinner if loading
        ) : (
          <span className="w-4 h-4">{icon}</span>
        )}
        <span>{text}</span>
      </>
    </button>
  );
};
