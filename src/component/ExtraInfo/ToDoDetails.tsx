import React, { useContext } from "react";
import { TodoContext } from "../../context/Context";
import "./ToDoDetails.css";
const ToDoDetails = () => {
  const { data } = useContext(TodoContext);
  const completedItem = data.filter((data1) => data1.completed === 1);
  const incompletedItem = data.filter((data1) => data1.completed === 0);
  console.log(completedItem.length);
  return (
    <div className="ExtraDetail">
      <p className="completedItem">
        Completed:
        {completedItem.length}
      </p>
      <p className="inCompletedItem">
        Incompleted:
        {incompletedItem.length}
      </p>
    </div>
  );
};

export default ToDoDetails;
