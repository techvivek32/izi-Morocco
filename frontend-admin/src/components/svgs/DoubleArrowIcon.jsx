const DoubleArrowIcon = ({ variant = "light", className = "" }) => {
  const fill = variant === "light" ? "#ffffff" : "var(--color-accent)";
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      className={className}
      height="24px"
      width="24px"
    >
      <polyline
        style={{
          fill: "none",
          stroke: fill,
          strokeWidth: 2,
          strokeMiterlimit: 10,
        }}
        points="15.4,5.5 25.9,16 15.4,26.5 "
      />
      <polyline
        style={{
          fill: "none",
          stroke: fill,
          strokeWidth: 2,
          strokeMiterlimit: 10,
        }}
        points="8.4,5.5 18.9,16 8.4,26.5 "
      />
    </svg>
  );
};

export default DoubleArrowIcon;
