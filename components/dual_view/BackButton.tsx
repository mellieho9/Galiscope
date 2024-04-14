import React from 'react';
import CustomButton from "../Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"


export const BackButton = () => {
    return (
        <CustomButton rounded="3xl"  leftIcon={<ArrowLeftIcon  className="h-4 w-4" />}>
            Back
        </CustomButton>
    );
};
