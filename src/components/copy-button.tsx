"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ReactElement } from "react";
import SimpleTooltip from "./simple-tooltip";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps): ReactElement => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SimpleTooltip content="Copy contents">
        <button
      onClick={copyToClipboard}
      className="absolute right-2 top-2 p-2 rounded-md bg-[#0D1117]/70 hover:bg-[#161B22]/70 transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
    </SimpleTooltip>
  );
}; 