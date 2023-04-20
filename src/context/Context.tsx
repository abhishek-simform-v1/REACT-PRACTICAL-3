import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}
interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}
export const TodoContext = createContext<{
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}>({
  data: [],
  setData: () => {},
});

function checkSessionExpiry(storageKey: string) {
  const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const currentDate = new Date().getDate();

  data.map((items: DataItem) => {
    if (currentDate !== items.createdAt) {
      localStorage.removeItem(storageKey);
    }
  });
  return data;
}

const Context = ({ children }: Props) => {
  const [data, setData] = useState<DataItem[]>(init);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  // console.log(ndata);
  function init() {
    const localdata = checkSessionExpiry("data");

    if (localdata !== null) {
      return localdata;
    }
    return [];
  }
  return (
    <TodoContext.Provider value={{ data, setData }}>
      {children}
    </TodoContext.Provider>
  );
};

export default Context;
