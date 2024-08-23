import { format } from "date-fns";

export const formatDate = (date: string) => {
  const initialDate = new Date(date);
  const formattedDate = format(initialDate, "MMMM dd, yyyy (hh:mm a)");
  return formattedDate;
};
