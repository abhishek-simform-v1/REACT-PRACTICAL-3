import { useSelector } from "react-redux";
import "./ToDoDetails.css";
const ToDoDetails = () => {
  const data = useSelector((state: any) => state.todo.todos);
  const completedItem = data.filter((data1: any) => data1.completed === true);
  const incompletedItem = data.filter(
    (data1: any) => data1.completed === false
  );
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
