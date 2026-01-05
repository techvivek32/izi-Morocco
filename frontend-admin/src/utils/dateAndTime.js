import { format, isValid } from "date-fns";

export const formatTimeToAMPM = (time24) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

export const formatDate = (date, formatStr = "dd-MM-yyyy") => {
  try {
    const parsedDate = new Date(date);
    if (!isValid(parsedDate)) return "";
    return format(parsedDate, formatStr);
  } catch {
    return "";
  }
};

export const splitDate = (date) => {
  return date.split("/").join("-");
};

export const dateSetterToSlash=(date)=>{
  return date.split('-').join('/')
}
