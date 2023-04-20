import { ReactNode } from "react";
import usegetTime from "../../hooks/usegetTime";
import "./DayAndDate.css";

export default function DayAndDate() {
  let CurrentDate = usegetTime();

  const [getDate, getDay, getMonth, getYear] = [
    CurrentDate[0].getDate,
    CurrentDate[0].getDay,
    CurrentDate[0].getMonth,
    CurrentDate[0].getYear,
  ];

  return (
    <div className="DayAndMonthAndYearAndCDay">
      <div className="DayAndMonthAndYear">
        <div className="day">{getDate}</div>
        <div className="DayAndMonth">
          <div className="month">{getMonth}</div>
          <div className="year">{getYear}</div>
        </div>
      </div>
      <div className="today">{getDay}</div>
    </div>
  );
}
