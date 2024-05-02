import React from "react";
import { Button, ButtonProps, Spinner } from "@chakra-ui/react";

const CustomButton: React.FC<ButtonProps & { isLoading?: boolean }> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <Button
      bg="teal"
      color="white"
      w="100%"
      _hover={{
        bg: "teal.500",
      }}
      isLoading={isLoading} // Use isLoading prop to control the display of the spinner
      spinner={<Spinner color="white" />} // Optional: customize the spinner color and appearance
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
