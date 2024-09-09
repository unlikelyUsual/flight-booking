export const convertDateToString = (dateStr: string) => {
  const date = new Date(dateStr);
  // Get hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
