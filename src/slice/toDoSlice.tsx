import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// export interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };
export interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}
function removeOldTask(list: DataItem[]): DataItem[] {
  let date: Date = new Date();

  let filteredArray: DataItem[] = list.filter(
    (task) => task.createdAt == date.getDate()
  );

  localStorage.setItem('data', JSON.stringify(filteredArray));

  return filteredArray;
}
let initialState = removeOldTask(
  JSON.parse(localStorage.getItem('data')!) || []
);

export const toDoSlice = createSlice({
  name: 'ToDo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<DataItem>) => {
      state.id = Math.trunc(Math.random() * 89345);
    },
    deleteToDo: (state, action: PayloadAction<DataItem>) => {
      state;
    },
    updateToDo: (state, action: PayloadAction<DataItem>) => {
      state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteToDo, updateToDo } = toDoSlice.actions;
// export const { add, delete, complete } = toDoSlice.actions;

export default toDoSlice.reducer;
