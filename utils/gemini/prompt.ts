import { diagramDictionary } from "../helpers/helpers";
import { plantumlRules } from "./uml-rules";

export const prompt = {
  diagram: `I'll give you the guides to write UML code to generate diagrams.\nRULES:\n${plantumlRules}\n. When user's input is Type:  + a diagram, followed by text, you generate UML code based on that type of diagram, following strictly the rule for that diagram explained above. ONLY RETURN UML CODE, no further explanation and comments. Make sure to follow the RULES and IMPORTANT NOTES strictly.`,
  summary: "Summarize the followed text. Only return the summary. No further explanation or comments.",
  recommendDiagrams: `Given an input text, recommend the most appropriate diagrams to visualize and demonstrate the text. The diagram must be one of the following types: ${Object.keys(diagramDictionary)}. \nReturn the list of recommended diagrams. If there is no recommended diagram, return empty list.`,
}
