import { Box, Heading, Image, Text } from '@chakra-ui/react';
import svg from '../../app/diagram.svg';
import { CardAction } from './CardAction';
import { UMLDiagram } from '@/types/uml-diagram.types';
import { useGetSignedUrl } from '@/hooks/file.hook';
import { useEffect, useState } from 'react';
import { useDeleteUml } from '@/hooks/uml.hooks';
import { useQueryClient } from '@tanstack/react-query';

interface DiagramCardProps {
  diagram: UMLDiagram;
}

export const DiagramCard: React.FC<DiagramCardProps> = ({
  diagram
}) => {
  const [signedUrl, setSignedUrl] = useState<string>('');

  const queryClient = useQueryClient();
  const { mutate: deleteDiagram } = useDeleteUml({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['get-umls-by-document-id',diagram.document_id]
      })
    },
    onError: () => {
      // TODO: handle error here
    }
  });

  useEffect(() => {
    const getSignedUrl = async () => {
      const signedUrl = await useGetSignedUrl(diagram.filepath);
      setSignedUrl(signedUrl);
    };
    getSignedUrl();
    console.log('fetching signed url');
  }, [diagram.filepath]);

  const handleDeleteDiagram = () => {
    deleteDiagram(diagram.id);
  }

  return (
    <div className="transition ease-in-out delay-150 border border-gray-200 bg-gray-50 rounded-lg hover:border-teal">
      <Box
        overflow="hidden"
        borderRadius="lg"
        width="165px"
        height="165px"
        display="flex"
        flexDirection="column"
      >
        <Image
          src={signedUrl}
          width="full"
          height="65%"
          objectFit="fill"
        />
        <div className="flex-grow p-2 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
          <Heading isTruncated color="gray.600" size="xs">
            {diagram.name}
          </Heading>
          <div className="flex flex-row justify-between text-xs text-gray-500">
            <Text isTruncated>Page {diagram.original_text.position.pageNumber}</Text>
            <CardAction
              handleDeleteFolder={handleDeleteDiagram}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};
