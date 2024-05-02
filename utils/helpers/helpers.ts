import classDiagram from '../../public/diagrams/class diagram.svg';
import flowChart from '../../public/diagrams/flow chart.svg';
import mindMap from '../../public/diagrams/mind map.svg';
import quadrantDiagram from '../../public/diagrams/quadrant diagram.svg';
import sequenceDiagram from '../../public/diagrams/sequence diagram.svg';
import stateDiagram from '../../public/diagrams/state diagram.svg';

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

export const base64ToFile = (
  base64Data: string,
  filename: string
): File => {
  // Extract the base64 data from the data URL
  const base64ContentArray = base64Data.split(',');
  const mimeType = base64ContentArray[0].match(
    /[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/
  )?.[0];

  // Decode base64 string
  const byteCharacters = atob(base64ContentArray[1]);

  // Create an array buffer and view to handle the binary data
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Convert to Blob
  const blob = new Blob([byteArray], { type: mimeType });

  // Create and return the File object
  return new File([blob], filename, { type: mimeType });
};

export const download = (filename: string, content: string) => {
  var element = document.createElement('a');
  element.setAttribute('href', content);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const diagramDictionary: Record<string, any> = {
  'Class Diagram': classDiagram.src,
  'Flow Chart': flowChart.src,
  'Mind Map': mindMap.src,
  'Quadrant Diagram': quadrantDiagram.src,
  'Sequence Diagram': sequenceDiagram.src,
  'State Diagram': stateDiagram.src,
};
