// Importing React hooks for state and effect
import React, { useState, useEffect, memo } from "react";

// Defining an interface to describe the shape of the data object returned by the hook
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

// Defining a custom hook named usegetTime
const usegetTime = () => {
  // Initializing a state variable with an empty array
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

  // Defining arrays for days of the week and months of the year
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

  // Using the useEffect hook to update the state variable with the current date and time
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

    // Clearing the timer to prevent memory leaks
    return () => clearTimeout(timer);
  });

  // Returning the state variable
  return data;
};

// Exporting the custom hook
export default usegetTime;
