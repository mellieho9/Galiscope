import classDiagram from "../../public/diagrams/class diagram.svg"
import flowChart from "../../public/diagrams/flow chart.svg"
import mindMap from "../../public/diagrams/mind map.svg"
import quadrantDiagram from "../../public/diagrams/quadrant diagram.svg"
import sequenceDiagram from "../../public/diagrams/sequence diagram.svg"
import stateDiagram from "../../public/diagrams/state diagram.svg"

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}



export const diagramDictionary = {
  "classDiagram": classDiagram.src,
  "flowChart":flowChart.src,
  "mindMap":mindMap.src,
  "quadrantDiagram":quadrantDiagram.src,
  "sequenceDiagram":sequenceDiagram.src,
  "stateDiagram":stateDiagram.src
};
