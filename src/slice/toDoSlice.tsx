import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import usegetTime from "../hooks/usegetTime";
import Swal from "sweetalert2";

// export interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };
export interface DataItem {
  id: number;
  task: any;
  completed: boolean;
  createdAt: number;
}
function removeOldTask(list: DataItem[]): DataItem[] {
  let date: Date = new Date();

  let filteredArray: DataItem[] = list.filter(
    (task) => task.createdAt == date.getDate()
  );

  localStorage.setItem("data", JSON.stringify(filteredArray));

  return filteredArray;
}
export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    // Pause the timer when the user hovers over the notification
    toast.addEventListener("mouseenter", Swal.stopTimer);
    // Resume the timer when the user leaves the notification
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
// let initialState =
// toDoitem:
// completed: false,
// Get the current time using a custom hook
interface stat {
  todos: DataItem[];
  status: string;
}
const init: stat = {
  todos: removeOldTask(JSON.parse(localStorage.getItem("data")!) || []),
  // todos: [],
  status: "idle",
};
export const toDoSlice = createSlice({
  name: "ToDo",
  initialState: init,
  reducers: {
    addTodo: (state, action: PayloadAction<DataItem>) => {
      state.todos.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.todos));
    },
    CompletedToDo: (state, action: PayloadAction<DataItem>) => {
      // Create a new updated to-do item with the updated completed status
      console.log(action.payload);

      const newUpdatedTodo = action.payload;
      const data = state.todos;
      // Map through the data to find the updated item and update it
      const newData = data.map((currentData: DataItem) => {
        if (currentData.id === newUpdatedTodo.id) {
          // console.log(currentData);
          // console.log(newUpdatedTodo);
          return newUpdatedTodo;
        } else {
          return currentData;
        }
      });
      function sortByCompleted(tasks: DataItem[]) {
        return tasks.sort(
          (a: DataItem, b: DataItem) =>
            Number(b.completed) - Number(a.completed)
        );
      }
      console.log(sortByCompleted(newData));
      state.todos = sortByCompleted(newData);
      localStorage.setItem("data", JSON.stringify(state.todos));
    },
    deleteToDo: (state, action: PayloadAction<DataItem[]>) => {
      state.todos = [];
      state.todos.push(...action.payload);
      localStorage.setItem("data", JSON.stringify(state.todos));
    },

    updateToDo: (state, action: PayloadAction<DataItem[]>) => {
      state.todos = [];
      state.todos.push(...action.payload);
      localStorage.setItem("data", JSON.stringify(state.todos));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteToDo, CompletedToDo, updateToDo } =
  toDoSlice.actions;
// export const { add, delete, complete } = toDoSlice.actions;

export default toDoSlice.reducer;
