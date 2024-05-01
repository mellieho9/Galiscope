import { useUpdateChatHistory } from '@/hooks/chat-history.hooks';
import { useSendMessage } from '@/hooks/gemini.hooks';
import { ChatHistory } from '@/types/chat-history.types';
import {
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { Content } from '@google/generative-ai';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface ChatboxProps {
  setMessagePending: (value: boolean) => void;
  chatHistory: ChatHistory;
  refetch: () => void;
}

export const Chatbox = ({ setMessagePending, chatHistory, refetch }: ChatboxProps) => {
  const [message, setMessage] = useState<string>('');

  const { mutate: updateChatHistory, isPending: updatingChatHistory } = useUpdateChatHistory(
    chatHistory.id,
    {
      onSuccess: () => refetch(),
    }
  );
  const { mutate: sendMessage, isPending: sendingMessage } = useSendMessage();

  useEffect(() => {
    setMessagePending(updatingChatHistory || sendingMessage);
  }, [updatingChatHistory, sendingMessage]);

  const handleSendMessage = async () => {
    const history = chatHistory.history;
    const userMessage: Content = {
      role: 'user',
      parts: [
        {
          text: message,
        },
      ],
    }
    history.push(userMessage);

    // send message
    await sendMessage({ input: message, history: history.slice(0, history.length - 1) }, {
      onSuccess: async (data) => {
        const geminiResponse: Content = {
          role: 'model',
          parts: [
            {
              text: data.geminiResponse,
            },
          ],
        };

        await updateChatHistory({
          history: [...history, geminiResponse],
        });
      },
    });
    setMessage('');
  };

  return (
    <div className="w-full pr-8 justify-center absolute bottom-5 z-50">
      <InputGroup size="md" className="flex-row bg-white">
        <Input
          fontSize={'xs'}
          value={message}
          placeholder="Ask me anything..."
          className="border-0 text-xs focus:ring-0 text-gray-500"
          focusBorderColor="teal.main"
          onChange={(e) => setMessage(e.target.value)}
        />
        <InputRightElement>
          <button
            className="text-teal hover:text-gray-500"
            onClick={handleSendMessage}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
