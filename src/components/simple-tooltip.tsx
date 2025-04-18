import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SIDE_OPTIONS } from "@radix-ui/react-popper";
import { ReactElement, ReactNode } from "react";

/**
 * The props for a simple tooltip.
 */
type SimpleTooltipProps = {
  /**
   * The content to display in the tooltip.
   */
  content: string | ReactElement;

  /**
   * The side to display the tooltip on.
   */
  side?: (typeof SIDE_OPTIONS)[number];

  /**
   * The children to render in this tooltip.
   */
  children: ReactNode;
};

/**
 * A simple tooltip, this is wrapping the
 * shadcn tooltip to make it easier to use.
 *
 * @return the tooltip jsx
 */
const SimpleTooltip = ({
  content,
  side,
  children,
}: SimpleTooltipProps): ReactElement => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent className="bg-accent text-accent-foreground" side={side}>
      {content}
    </TooltipContent>
  </Tooltip>
);
export default SimpleTooltip;
