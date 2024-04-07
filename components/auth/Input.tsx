import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';


const CustomInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      {...props} 
      shadow="sm" 
      paddingY={4}
      _hover={{ shadow: "sm" }} 
      _focus={{ borderColor: "teal", shadow: "sm" }} 
    />
  );
};

export default CustomInput;