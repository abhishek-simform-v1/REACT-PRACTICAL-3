import "./ToDoSingleItem.css";
import done from "./../../assets/complete.png";
import notDone from "./../../assets/notcomplete.png";
import deleteImg from "./../../assets/delete.png";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/Context";
import { Toast } from "../AddUserInput/AddInput";
interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}

type Props = {
  currentGivenData: DataItem;
};

const ToDoSingleItem = ({ currentGivenData }: Props) => {
  const { data, setData } = useContext(TodoContext);
  const [completed, setCompleted] = useState(currentGivenData.completed);

  const handleCompleted = () => {
    setCompleted(completed == 0 ? 1 : 0);
  };

  const newUpdatedTodo = { ...currentGivenData, completed: completed };
  const newData = data.map((currentData: DataItem) => {
    if (currentData.id === currentGivenData.id) {
      return newUpdatedTodo;
    } else {
      return currentData;
    }
  });

  function sortByCompleted(tasks: DataItem[]) {
    return tasks.sort((a: DataItem, b: DataItem) => b.completed - a.completed);
  }
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleMouseEnter = () => {
    setConfirmDelete(true);
  };

  const handleMouseLeave = () => {
    setConfirmDelete(false);
  };
  let modifiedItems: DataItem[];
  const handleDelete = () => {
    Toast.fire({
      icon: "error",
      title: "Task Deleted !!!",
    });

    // delete the item
    const index = data.findIndex(
      (currentData) => currentData.id === currentGivenData.id
    );
    // remove the item from the array
    modifiedItems = [...data];
    modifiedItems.splice(index, 1);
    // convert the modified array back into a string and store it in local storage
    setData(modifiedItems);
  };

  useEffect(() => {
    setData(sortByCompleted(newData));
  }, [completed]);

  return (
    <div>
      <li
        key={currentGivenData.id}
        className={completed === 1 ? "item notdone" : "item "}
        onClick={handleCompleted}
      >
        <p className={completed ? "completedTask" : "inCompletedTask"}>
          {currentGivenData.task}
        </p>
        <div>
          {!completed ? (
            <button onClick={handleCompleted}>
              <img
                className="closeBtn"
                src={completed === 1 ? done : notDone}
                alt="done"
              />
            </button>
          ) : (
            <button
              onClick={handleDelete}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {confirmDelete ? (
                <>
                  <img className="closeBtn" src={deleteImg} alt="done" />
                </>
              ) : (
                <img
                  className="closeBtn"
                  src={completed === 1 ? done : notDone}
                  alt="done"
                />
              )}
            </button>
          )}
        </div>
      </li>
    </div>
  );
};

export default ToDoSingleItem;
