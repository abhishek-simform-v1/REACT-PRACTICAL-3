import { useEffect, useRef, memo, useContext } from "react";
import { TodoContext } from "../../context/Context";
import AddInput from "../AddUserInput/AddInput";
import ToDoSingleItem from "../ToDoSingleItem/ToDoSingleItem";
import addTask from "../../assets/addTask.svg";
import { AnimatePresence, motion } from "framer-motion";
import "./ToDoList.css";
const ToDoList = () => {
  const { data } = useContext(TodoContext);
  const listRef = useRef<HTMLUListElement>(null);
  interface DataItem {
    id: number;
    task: string;
    completed: number;
    createdAt: number;
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <AnimatePresence>
      <ul ref={listRef} className="listitemContainer">
        {data && data.length !== 0 ? (
          data.map((item: DataItem) => (
            <motion.div
              key={item.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <ToDoSingleItem currentGivenData={item} />
            </motion.div>
          ))
        ) : (
          <motion.div
            key="addTask"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img src={addTask} alt="Add task" className="addTaskImge" />
          </motion.div>
        )}
      </ul>
      <AddInput />
    </AnimatePresence>
  );
};

export default memo(ToDoList);
