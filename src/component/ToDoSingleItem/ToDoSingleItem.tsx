// Import necessary dependencies and assets
import './ToDoSingleItem.css';
import done from './../../assets/complete.png';
import notDone from './../../assets/notcomplete.png';
import deleteImg from './../../assets/delete.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../context/Context';
import { Toast } from '../AddUserInput/AddInput';

// Define the structure of each item in the to-do list
interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}

// Define the props passed to ToDoSingleItem component
type Props = {
  currentGivenData: DataItem;
};

// Define the ToDoSingleItem component
const ToDoSingleItem = ({ currentGivenData }: Props) => {
  // Access the to-do list data from the TodoContext
  const { data, setData } = useContext(TodoContext);

  // Define a state variable for the completed status of the current item
  const [completed, setCompleted] = useState(currentGivenData.completed);

  // Handle the completion of a task
  const handleCompleted = () => {
    setCompleted(completed === 0 ? 1 : 0);
  };

  // Create a new updated to-do item with the updated completed status
  const newUpdatedTodo = { ...currentGivenData, completed: completed };

  // Map through the data to find the updated item and update it
  const newData = data.map((currentData: DataItem) => {
    if (currentData.id === currentGivenData.id) {
      return newUpdatedTodo;
    } else {
      return currentData;
    }
  });

  // Sort the tasks by completion status
  function sortByCompleted(tasks: DataItem[]) {
    return tasks.sort((a: DataItem, b: DataItem) => b.completed - a.completed);
  }

  // Define state for the confirmation of task deletion
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Handle mouse enter event to display delete confirmation
  const handleMouseEnter = () => {
    setConfirmDelete(true);
  };

  // Handle mouse leave event to hide delete confirmation
  const handleMouseLeave = () => {
    setConfirmDelete(false);
  };

  // Define an array for modified to-do items
  let modifiedItems: DataItem[];
  /* This function is responsible for deleting a task. It displays a toast message
using the 'Toast' component and then modifies the array of tasks by removing the
task that was deleted. The modified array is stored in local storage. */

  const handleDelete = () => {
    Toast.fire({
      icon: 'error',
      title: 'Task Deleted !!!',
    });

    // Find the index of the task to be deleted
    const index = data.findIndex(
      (currentData) => currentData.id === currentGivenData.id
    );
    // Make a copy of the tasks array and remove the task to be deleted
    const modifiedItems = [...data];
    modifiedItems.splice(index, 1);
    // Store the modified array in local storage
    setData(modifiedItems);
  };

  /* This effect hook sorts the task list by completion status every time the 'completed'
  state variable changes. */

  useEffect(() => {
    setData(sortByCompleted(newData));
  }, [completed]);

  /* This component renders a single item of the to-do list. It displays the task
  description and a button that can be used to mark the task as completed or delete it. */

  return (
    <div>
      <li
        key={currentGivenData.id}
        className={completed === 1 ? 'item notdone' : 'item '}
        onClick={handleCompleted}
      >
        <p className={completed ? 'completedTask' : 'inCompletedTask'}>
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
