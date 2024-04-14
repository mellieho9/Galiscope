import React from 'react';
import CustomButton from "../Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { Button, IconButton } from '@chakra-ui/react';


export const BackButton = () => {
    return (
        <button className="p-2 px-3 shadow rounded-full items-center bg-teal text-white text-sm font-semibold flex flex-row shadow hover:bg-white border hover:border-teal hover:text-teal"><ArrowLeftIcon className="w-4 h-4 mr-2" />Back</button>
    );
};
