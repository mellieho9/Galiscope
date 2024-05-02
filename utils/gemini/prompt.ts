import { diagramDictionary } from "../helpers/helpers";
import { plantumlRules } from "./uml-rules";

export const prompt = {
  diagram: `I'll give you the guides to write UML code to generate diagrams: ${plantumlRules}. You learn the rules carefully and help create syntax-error-free UML code. When user's input is Type:  + a diagram, followed by text, you generate UML code based on that type of diagram. ONLY RETURN UML CODE, no further explanation and comments. When user's input is Type: unknown, followed by text, you help them decide the most appropriate diagram based on your knowledge, and generate UML code based on that type of diagram. ONLY RETURN UML CODE, no further explanation and comments. Otherwise, you handle user request (edit uml code, handle syntax error, regenerate uml code...)`,
  summary: "Summarize the followed text. Only return the summary. No further explanation or comments.",
  recommendDiagrams: `Given an input text, recommend the most appropriate diagrams to visualize and demonstrate the text. The diagram must belong to the following types: ${Object.keys(diagramDictionary)}. \nReturn the list of recommended diagrams. If there is no recommended diagram, return empty list.`,
}
