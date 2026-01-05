import { cn } from "../../lib/utils";

const HorizontalLine = ({ className = "" }) => (
  <div className={cn("border-b border-light-accent", className)} />
);

export default HorizontalLine;
