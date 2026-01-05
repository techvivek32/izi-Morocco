export const getNestedError = (obj, path) => {
  return path?.split(".")?.reduce((o, key) => (o ? o[key] : undefined), obj);
};

export const formatDateToReadable = (
  dateString,
  withoutDate = false,
  isUTC = false
) => {
  let newDateString;
  if (isUTC) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getUTCFullYear();

    newDateString = `${day}-${month}-${year}`;
  }
  const [day, month, year] = (isUTC ? newDateString : dateString)
    .split("-")
    .map(Number);

  // Create a new Date object
  // Note: Months are 0-indexed in JavaScript, so we subtract 1 from the month
  const date = new Date(year, month - 1, day);

  // Get the day, month name, and year from the Date object
  const formattedDay = date.getDate();
  const formattedMonth = date.toLocaleString("en-US", {
    month: "short",
  });
  const formattedYear = date.getFullYear();

  // Return the formatted date string
  return withoutDate
    ? `${formattedMonth} ${formattedYear}`
    : `${formattedDay} ${formattedMonth} ${formattedYear}`;
};
