import { ConversationType } from "./types";

export const sortConversations = (array: ConversationType[]) => {
  const sortedConversations = array.toSorted(
    (a: ConversationType, b: ConversationType) => {
      return (
        (b.lastDate as unknown as number) - (a.lastDate as unknown as number)
      );
    }
  );
  return sortedConversations;
};

export const handleChatDate = (timeStamp: string) => {
  const a = new Date();
  const b = new Date(+timeStamp);

  const weekday = getDayString(b.getDay());
  const month = getMonthString(b.getMonth());
  const date = b.getDate();
  const hour = b.getHours();
  const minute = b.getMinutes();

  const hoursAndMinutes = convertToTwelveHours(hour, minute);

  if (
    a.getFullYear() !== b.getFullYear() ||
    a.getMonth() !== b.getMonth() ||
    a.getDate() !== b.getDate()
  )
    return weekday + " " + date + " " + month + " | " + hoursAndMinutes;
  return hoursAndMinutes;
  return weekday + " " + date + " " + month + " | " + hoursAndMinutes;
};

const convertToTwelveHours = (h: number, m: number) => {
  let period: "AM" | "PM" = "AM";
  let hour: number;

  if (h > 12) {
    period = "PM";
    hour = h - 12;
  } else if (h === 12) {
    period = "PM";
    hour = h;
  } else if (h < 12 && h > 0) {
    period = "AM";
    hour = h;
  } else {
    period = "AM";
    hour = h + 12;
  }

  let hzero = hour.toString();
  let mzero = m.toString();

  if (hour < 10) {
    hzero = `0${hour}`;
  }
  if (m < 10) {
    mzero = `0${m}`;
  }

  return hzero + ":" + mzero + " " + period;
};

const getDayString = (day: number) => {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "";
  }
};

const getMonthString = (month: number) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "";
  }
};

const handleDate = (timeStamp: string) => {
  return (
    new Date(+timeStamp).toDateString() +
    " | " +
    new Date(+timeStamp).toLocaleTimeString()
  );
};
