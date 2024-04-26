import { InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const Chatbox = () => {
  return (
    <div className="w-full pr-8 justify-center absolute bottom-5 z-50">
      <InputGroup size="md" className="flex-row bg-white">
        <Input
          fontSize={"xs"}
          placeholder="Ask me anything..."
          className="border-0 text-xs focus:ring-0"
          focusBorderColor="teal.main"
        />
        <InputRightElement>
          <button className="text-teal hover:text-gray-500">
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
