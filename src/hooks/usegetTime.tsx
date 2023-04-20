import { useState, useEffect } from "react";
export interface GetTime {
  getYear: number;
  getMonth: string;
  getDate: number;
  getDay: string;
  getHours: number;
  getMinutes: number;
  getSeconds: number;
  getMilliseconds: number;
  getTimeStamp: number;
}
const usegetTime = () => {
  const [data, setData] = useState<GetTime[] | []>([
    {
      getYear: 0,
      getMonth: "",
      getDate: 0,
      getDay: "",
      getHours: 0,
      getMinutes: 0,
      getSeconds: 0,
      getMilliseconds: 0,
      getTimeStamp: 0,
    },
  ]);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    let timer = setTimeout(() => {
      const date = new Date();
      setData([
        {
          getYear: date.getFullYear(),
          getMonth: monthsOfYear[date.getMonth()],
          getDate: date.getDate(),
          getDay: daysOfWeek[date.getDay()],
          getHours: date.getHours(),
          getMinutes: date.getMinutes(),
          getSeconds: date.getSeconds(),
          getMilliseconds: date.getMilliseconds(),
          getTimeStamp: date.getTime(),
        },
      ]);
    }, 1);

    return () => clearTimeout(timer);
  });

  return data;
};
export default usegetTime;
