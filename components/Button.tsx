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
      isLoading={isLoading} 
      spinner={<Spinner color="white" />} 
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
