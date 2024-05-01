'use client';
import { Image } from '@chakra-ui/react';
import diagram from '../../../app/diagram.svg';
import { TopModal } from './TopModal';
import { BottomModal } from './BottomModal';
import { useGetUmlById } from '@/hooks/uml.hooks';
import { useEffect, useMemo, useState } from 'react';
import { useGetSignedUrl } from '@/hooks/file.hook';

interface DiagramViewProps {
  umlDiagramId: string;
}

export function DiagramView({ umlDiagramId }: DiagramViewProps) {
  const {
    data: umlDiagram,
    isLoading: loadingUmlDiagram,
  } = useGetUmlById(umlDiagramId);

  const [imageUrl, setImageUrl] = useState<string>('');
  const name = useMemo(() => umlDiagram?.name ?? '', [umlDiagram]);

  useEffect(() => {
    const getSignedUrl = async () => {
      if (umlDiagram) {
        const signedUrl = await useGetSignedUrl(umlDiagram.filepath);
        setImageUrl(signedUrl);
      }
    };
    getSignedUrl();
  }, [umlDiagram]);

  return (
    <div className="w-full p-5 pb-8 min-h-screen justify-between flex flex-col justify-center items-center bg-gray-50">
      {/* name  */}
      <div className="w-full flex justify-end">
        <TopModal name={name} />
      </div>
      {/* diagonal divider  */}
      <Image boxSize="w-full" src={imageUrl} alt="Diagram" />
      {/* modal  */}
      <BottomModal umlDiagram={umlDiagram} imageUrl={imageUrl} />
    </div>
  );
}
