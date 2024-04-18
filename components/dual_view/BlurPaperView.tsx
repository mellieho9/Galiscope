'use client';
import {
  Box,
  Heading,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import blurred_paper from '../../app/blurred_paper.png';
import paper from '../../app/paper.png';
import { CursorArrowRaysIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export function BlurPaperView() {
  const [blockOpen, setBlockOpen] = useState(true);
  const [displayPaper, setDisplayPaper] = useState(blurred_paper);

  const readPaper = () => {
    setBlockOpen(false);
    setDisplayPaper(paper);
  };
  
  return (
    <div className="max-h-screen w-full overflow-y-auto">
      <div style={{ width: '100%', boxShadow: 'none' }}>
        <Image src={displayPaper.src} width="100%" height="100%" />
        {blockOpen && (
          <div className="absolute inset-0 flex items-center justify-center w-1/2">
            <Box bg="white" p={6} borderRadius="xl" onClick={readPaper}>
              <CursorArrowRaysIcon
                className="h-6 w-full my-3 mx-1 text-center"
                fill="teal"
              />
              <Heading color="teal" size="sm" className="mb-5 text-center">
                Click here to continue reading the paper
              </Heading>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
