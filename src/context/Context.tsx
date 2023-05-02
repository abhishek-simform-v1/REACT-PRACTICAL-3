// Importing necessary modules from React
import React, { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

// Defining the props interface for the "Context" component
interface Props {
  children: ReactNode | ReactNode[]; // Children can be a single node or an array of nodes
  className?: string; // className is an optional string type prop
}

// Defining the interface for each to-do item
interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}

// Creating a context object for the to-do data
export const TodoContext = createContext<{
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}>({
  data: [],
  setData: () => {},
});

// Defining the "Context" component
const Context = ({ children }: Props) => {
  // Declaring the "data" and "setData" state variables using useState hook and initializing it with the data from local storage or an empty array
  const [data, setData] = useState<DataItem[]>(init);

  // Updating the data in local storage whenever the "data" state variable changes
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  // Function to check if the to-do items in local storage have expired

  // Function to initialize the data state variable
  function checkSessionExpiry(storageKey: string) {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]"); // Parsing the data from local storage

    // Checking each item in the data to see if it was created on the current date
    data.map((items: DataItem) => {
      if (new Date().getDate() !== items.createdAt) {
        localStorage.removeItem(storageKey); // Removing the data from local storage if it has expired
      }
    });
    return data;
  }

  function init() {
    const localdata = checkSessionExpiry("data");

    if (localdata !== null) {
      return localdata; // Returning the data from local storage if it exists
    }
    return []; // Returning an empty array if no data exists in local storage
  }

  // Rendering the "TodoContext.Provider" with the "data" and "setData" state variables as its value and the "children" as its children
  return (
    <TodoContext.Provider value={{ data, setData }}>
      {children}
    </TodoContext.Provider>
  );
};

// Exporting the "Context" component
export default Context;
