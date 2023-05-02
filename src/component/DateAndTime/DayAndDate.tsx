import usegetTime from "../../hooks/usegetTime"; // importing a custom hook
import "./DayAndDate.css"; // importing a CSS file for styling
import React from "react";
const DayAndDate = () => {
  // defining a functional component called "DayAndDate"
  let CurrentDate = usegetTime(); // using the custom hook to get the current date and time

  const [getDate, getDay, getMonth, getYear] = [
    // destructuring the date and time components from the hook
    CurrentDate[0].getDate,
    CurrentDate[0].getDay,
    CurrentDate[0].getMonth,
    CurrentDate[0].getYear,
  ];

  return (
    <div className="DayAndMonthAndYearAndCDay">
      {" "}
      {/* a container for the date and day */}
      <div className="DayAndMonthAndYear">
        {" "}
        {/* a container for the day, month, and year */}
        <div className="day">{getDate}</div> {/* displaying the day */}
        <div className="DayAndMonth">
          {" "}
          {/* a container for the month and year */}
          <div className="month">{getMonth}</div> {/* displaying the month */}
          <div className="year">{getYear}</div> {/* displaying the year */}
        </div>
      </div>
      <div className="today">{getDay}</div> {/* displaying the current day */}
    </div>
  );
};
export default React.memo(DayAndDate);
