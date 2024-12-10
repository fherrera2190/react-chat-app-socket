import moment from "moment";
export const hourMonth = (date: Date) => {
  const todayMonth = moment(date);
 return todayMonth.format("HH:mm a | MMMM DD");
};
