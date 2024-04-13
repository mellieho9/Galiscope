import React from "react";
import CustomButton from "./Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const BackButton = ({ ...props}) => {
  return (
    <CustomButton
      rounded="3xl"
      leftIcon={<ArrowLeftIcon className="h-5 w-5" />}
      {...props}
    >
      Back
    </CustomButton>
  );
};
