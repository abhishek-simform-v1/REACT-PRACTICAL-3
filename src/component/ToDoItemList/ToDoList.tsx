import { useEffect, useRef, memo, useContext, useState } from "react"; // Importing necessary libraries and hooks
import { TodoContext } from "../../context/Context"; // Importing TodoContext from Context file
import AddInput from "../AddUserInput/AddInput"; // Importing AddInput component
import ToDoSingleItem from "../ToDoSingleItem/ToDoSingleItem"; // Importing ToDoSingleItem component
import addTask from "../../assets/addTask.svg"; // Importing addTask image
import { AnimatePresence, motion } from "framer-motion"; // Importing motion components from Framer Motion
import "./ToDoList.css"; // Importing ToDoList styles
import { v4 as uuidv4 } from "uuid";
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
      {" "}
      ...
      <ul ref={listRef} className="listitemContainer">
        {data && data.length !== 0 ? (
          data.map((item: DataItem) => (
            <motion.li
              style={{ listStyle: "none" }}
              key={item.id} // generate a unique key using uuid
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <ToDoSingleItem currentGivenData={item} />
            </motion.li>
          ))
        ) : (
          <motion.div
            key="addTask"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <p className="nothingMessage">Add new Tasks !!!</p>
            <img src={addTask} alt="Add task" className="addTaskImge" />
          </motion.div>
        )}
      </ul>
      <AddInput />
    </AnimatePresence> // Closing AnimatePresence component
  );
};

export default memo(ToDoList); // Exporting ToDoList component wrapped inside memo() for performance optimization
