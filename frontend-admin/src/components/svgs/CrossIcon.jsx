const CrossIcon = ({ variant = "dark", className = "" }) => {
  const fill = variant === "light" ? "#ffffff" : "var(--color-danger)";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className={className}
    >
      <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5" />
    </svg>
  );
};

export default CrossIcon;
