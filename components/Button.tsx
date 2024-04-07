import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      bg="teal" 
      color="white"
      w="100%"
      _hover={{
        bg: 'teal.500', 
      }}
      {...props} 
    >
      {children}
    </Button>
  );
};

export default CustomButton;
