import { ReadingCard } from "@/components/ReadingCard"
import { Grid, GridItem } from "@chakra-ui/react"

export const DiagramGrid = () => {
  const cards = [
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
    {
      paperTitle: 'VTSUM-BLIP model',
      folder: 'folder',
      lastUpdatedTime: 'Jul 17, 2030'
    },
  ]
  return (
    <Grid templateColumns='repeat(3, 1fr)' className='ml-7'>
      {cards.map(card => 
        <GridItem>
          <ReadingCard paperTitle={card.paperTitle} folder={card.folder} lastUpdatedTime={card.lastUpdatedTime} />
        </GridItem>
      )}
    </Grid>
  )
}