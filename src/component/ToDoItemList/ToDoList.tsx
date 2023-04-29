import { useEffect, useRef, memo, useContext } from 'react'; // Importing necessary libraries and hooks
import { TodoContext } from '../../context/Context'; // Importing TodoContext from Context file
import AddInput from '../AddUserInput/AddInput'; // Importing AddInput component
import ToDoSingleItem from '../ToDoSingleItem/ToDoSingleItem'; // Importing ToDoSingleItem component
import addTask from '../../assets/addTask.svg'; // Importing addTask image
import { AnimatePresence, motion } from 'framer-motion'; // Importing motion components from Framer Motion
import './ToDoList.css'; // Importing ToDoList styles

const ToDoList = () => {
  // Declaring ToDoList component
  const { data } = useContext(TodoContext); // Getting the data from TodoContext
  const listRef = useRef<HTMLUListElement>(null); // Creating a ref for list

  interface DataItem {
    // Defining the DataItem interface
    id: number;
    task: string;
    completed: number;
    createdAt: number;
  }

  useEffect(() => {
    // Using useEffect hook
    if (listRef.current) {
      // Checking if the listRef exists
      listRef.current.scrollTop = listRef.current.scrollHeight; // Setting the scrollTop of the listRef to its scrollHeight
    }
  }, [data]); // Watching the changes in the data

  return (
    <AnimatePresence>
      {' '}
      // Using AnimatePresence component
      <ul ref={listRef} className="listitemContainer">
        {' '}
        {/* // Creating unordered list and applying the listRef */}
        {data && data.length !== 0 ? ( // Checking if data exists and is not empty
          data.map(
            (
              item: DataItem // Mapping through the data and returning ToDoSingleItem component for each item
            ) => (
              <motion.div // Using motion.div to apply animation on ToDoSingleItem component
                key={item.id} // Setting the key as item id
                initial={{ x: -100, opacity: 0 }} // Defining initial styles for animation
                animate={{ x: 0, opacity: 1 }} // Defining animation styles
                exit={{ x: 100, opacity: 0 }} // Defining exit styles for animation
                transition={{ type: 'spring', stiffness: 100 }} // Defining the transition type and stiffness
              >
                <ToDoSingleItem currentGivenData={item} />
                {/* // Passing item as props to ToDoSingleItem component */}
              </motion.div>
            )
          )
        ) : (
          // If data does not exist or is empty, show addTask image
          <motion.div // Using motion.div to apply animation on addTask image
            key="addTask" // Setting the key as "addTask"
            initial={{ scale: 0 }} // Defining initial styles for animation
            animate={{ scale: 1 }} // Defining animation styles
            transition={{ type: 'spring', stiffness: 100 }} // Defining the transition type and stiffness
          >
            <img src={addTask} alt="Add task" className="addTaskImge" />
            {/* //Adding the addTask image */}
          </motion.div>
        )}
      </ul>
      <AddInput />
    </AnimatePresence> // Closing AnimatePresence component
  );
};

export default memo(ToDoList); // Exporting ToDoList component wrapped inside memo() for performance optimization
