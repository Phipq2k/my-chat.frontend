import moment from "moment";
import "moment/locale/vi";

export const useTimeStamp = (timeStamp) => {
  const formattedTime = moment(timeStamp).utc().locale("vi");
  const timeItem = moment(formattedTime).format("LT");
  const timeGroup = moment(formattedTime).format('DD/MM/YY');
  const timeFromNow = moment(formattedTime, "DD MM YY").fromNow();
  return {timeItem, timeFromNow, timeGroup};
};
