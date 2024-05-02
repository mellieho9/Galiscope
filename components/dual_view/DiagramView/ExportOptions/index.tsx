'use client';
import React, { useState } from 'react';
import { ExportButton } from './ExportButton';
import { ModalItem } from '../BottomModal/ModalItem';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { download } from '@/utils/helpers/helpers';

interface ExportOptionsProps {
  imageUrl: string;
}

export const ExportOptions = ({ imageUrl }: ExportOptionsProps) => {
  // const [showExportOptions, setShowExportOptions] = useState(false);
  // const toggleExportOptions = () => setShowExportOptions(!showExportOptions);
  const [exporting, setExporting] = useState<boolean>(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const result = await axios.get(imageUrl, {
        responseType: 'blob',
      });
      const blob = await result.data;
      const url = URL.createObjectURL(blob);

      const filename =
        imageUrl.split('/').pop()?.split('.')[0] ?? 'diagram.png';

      download(filename, url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
    setExporting(false);
  };

  return (
    <div
      className={`flex flex-row flex items-center justify-start p-1 px-3 rounded-full`}
    >
      <ModalItem
        title={'Export'}
        icon={<ArrowDownTrayIcon />}
        onClick={handleExport}
        selected={exporting}
      />
      {/* {showExportOptions && (
        <div className="flex text-sm  flex-col ">
          <h1 className="text-teal font-medium">Export as...</h1>
          <div className="flex flex-row space-x-1">
            <ExportButton>SVG</ExportButton>
            <ExportButton>PDF</ExportButton>
            <ExportButton>UML</ExportButton>
          </div>
        </div>
      )} */}
    </div>
  );
};
