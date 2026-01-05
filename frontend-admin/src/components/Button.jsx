import { cn } from "../lib/utils";

const VARIANT_CLASSES = {
  light: "text-accent hover:bg-accent/20 border border-accent/50 duration-300",
  dark: "bg-accent text-white hover:bg-accent/90",
};

export default function Button({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  disabled = false,
  variant = "dark", // default to dark
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "cursor-pointer focus:ring-1 focus:outline-none font-medium rounded-lg px-3.5 lg:px-5 py-1.5 lg:py-2.5 text-center inline-flex items-center justify-center text-[10px] lg:text-xs h-10",
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark,
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {children}
    </button>
  );
}
