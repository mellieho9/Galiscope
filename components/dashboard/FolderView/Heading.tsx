import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { ProgressLabel } from "./ProgressLabel";

interface HeadingProps {
  title: string;
  incompleteRead: number;
  completeRead: number;
}

export const Heading: React.FC<HeadingProps> = ({ title, incompleteRead, completeRead }) => {
    const progress = (completeRead / (incompleteRead + completeRead)) * 100;
    return (
        <div className="w-full flex flex-col items-bottom justify-start px-6 pt-10 pb-5 border-b border-gray-200">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex px-2 py-4 flex-row justify-between items-center text-gray-800">
                <div className="flex flex-row items-center space-x-4">
                <CircularProgress fontWeight="semibold" color="teal" value={progress}>
                    <CircularProgressLabel>{progress.toFixed(1)}%</CircularProgressLabel>
                </CircularProgress>
                <p className="text-sm font-normal">Completion</p>
                </div>
                <div className="flex flex-row space-x-4">
                    <ProgressLabel label="to read" metric={incompleteRead} />
                    <ProgressLabel label="completed" metric={completeRead} />
                </div>
            </div>
        </div>
    );
};
