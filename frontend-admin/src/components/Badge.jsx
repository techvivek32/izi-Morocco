import { cn } from "../lib/utils";

const defaultText = {
  "not-done": "Not Done",
  done: "Done",
  pending: "Pending",
  inprogress: "In Progress",
  cancelled: "Cancelled",
  active: "Active",
  inactive: "Inactive",
  "doctor-timing": "Doctor Timing",
  transparent: "Status",
  completed: "Completed",
  booked: "Booked",
  rescheduled: "Rescheduled",
  billed: "Billed",
  bill: "Billed",
  unbill: "UnBilled",
  unpaid: "Unpaid",
  paid: "Paid",
  upi: "UPI",
  cash: "Cash",
  netbanking: "Net Banking",
};

// Color lists
const redList = [
  "cancelled",
  "not-done",
  "inactive",
  "unbill",
  "unpaid",
  "due",
];
const greenList = [
  "completed",
  "done",
  "active",
  "billed",
  "bill",
  "paid",
  "upi",
];
const yellowList = ["booked", "rescheduled", "pending", "cash"];
const purpleList = ["doctor-timing", "role", "net-banking"];
const grayList = ["transparent"];

// Determine color group
const getColorGroup = (type) => {
  if (greenList.includes(type)) return "green";
  if (redList.includes(type)) return "red";
  if (yellowList.includes(type)) return "yellow";
  if (purpleList.includes(type)) return "purple";
  if (grayList.includes(type)) return "gray";
  return "gray"; // default color
};

// Color mappings
const colorMap = {
  green: {
    // text: "text-green-500",
    bg: "bg-green-100",
    dot: "bg-green-500",
  },
  red: {
    text: "text-red-500",
    bg: "bg-red-100",
    dot: "bg-red-500",
  },
  yellow: {
    text: "text-yellow-600",
    bg: "bg-yellow-100",
    dot: "bg-yellow-500",
  },
  purple: {
    text: "text-purple-500",
    bg: "bg-purple-100",
    dot: "bg-purple-500",
  },
  gray: {
    // text: "text-black",
    bg: "bg-accent/30",
    dot: "bg-gray-600",
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
  },
};

const Badge = ({ type = "not-done", className = "", dot = true, title }) => {
  // Get current type properties
  const colorGroup = getColorGroup(type);
  const colors = colorMap[colorGroup];
  const text = title ? title : defaultText[type];

  return (
    <span
      className={cn(
        "text-[9px] lg:text-xs px-1 lg:px-2 py-0.5 lg:py-1 rounded-xl w-fit flex items-center gap-1 text-nowrap capitalize",
        colors.text,
        colors.bg,
        className
      )}
    >
      {dot && (
        <div
          className={cn(
            "w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full shrink-0",
            colors.dot
          )}
        />
      )}
      {text}
    </span>
  );
};

export default Badge;
