import { InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export const Chatbox = () => {
  const msgRef = useRef<string | any>('');

  const sendMessage = () => {
    const input = msgRef?.current?.value
    // get diagram schema
  }

  return (
    <div className="w-full pr-8 justify-center absolute bottom-5 z-50">
      <InputGroup size="md" className="flex-row bg-white">
        <Input
          ref={msgRef}
          fontSize={'xs'}
          placeholder="Ask me anything..."
          className="border-0 text-xs focus:ring-0"
          focusBorderColor="teal.main"
        />
        <InputRightElement>
          <button className="text-teal hover:text-gray-500" onClick={() => sendMessage()}>
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
