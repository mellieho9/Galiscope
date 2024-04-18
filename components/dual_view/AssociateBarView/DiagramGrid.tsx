import { ReadingCard } from '@/components/ReadingCard';

export const DiagramGrid = () => {
  const cards = [
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030',
    },
  ];
  return (
    <div className="flex flex-wrap gap-1/4">
      {cards.map((card) => (
          <ReadingCard
            paperTitle={card.paperTitle}
            folder={card.folder}
            lastUpdatedTime={card.lastUpdatedTime}
          />
      ))}
    </div>
  );
};
