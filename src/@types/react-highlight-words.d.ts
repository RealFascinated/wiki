declare module "react-highlight-words" {
  import { ComponentType } from "react";

  interface HighlighterProps {
    highlightClassName: string;
    searchWords: string[];
    autoEscape?: boolean;
    textToHighlight: string;
  }

  const Highlighter: ComponentType<HighlighterProps>;
  export default Highlighter;
}
