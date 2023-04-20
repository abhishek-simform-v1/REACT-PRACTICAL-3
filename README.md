# React-Todo-App

- This is a UI for a To-do App built using React.
- The setup for creating the React app is done using Webpack.
- The UI is built using React components : class component, stateless component and functional component with hooks.
- Here, the data is static and is being passed to the list from the `ListData.jsx` file.
- Live demonstration : [Todo App](https://production--react-practicl-3.netlify.app/)

---

## Tech Stack

- The website is built with famous web development tools, they are mentioned below:
  [![Tech Stack](https://skillicons.dev/icons?i=html,css,js,react,webpack,bootstrap,vscode,git,github)](https://skillicons.dev)

---

## Class components

- A class component is a more featured way to define a React component.
- It also acts like a function that receives props, but that function also considers a private internal state as additional input that controls the returned JSX.
- Class component can be created using the class keyword, and it extends the React.Component class.

---

## Functional components

- Functional components are just javascript functions, which contains some logic to perform certain actions.
- These components accept the data as props and return the React element which is nothing HTML content.
- With introduction to the React 16, writing functional components is the standard way of creating components in modern react applications.

---

## Hooks

- Hooks allow function components to have access to state and other React features.
- Hooks allow us to "hook" into React features such as state and lifecycle methods.
- There are 3 rules for hooks:
  1. Hooks can only be called inside React function components.
  2. Hooks can only be called at the top level of a component.
  3. Hooks cannot be conditional

#### file structure Like this

```
TO-DO-LIST(WORKING)/
├── node_modules
├── src/
|   ├──assets/
|   ├──component/
|          ├── AddUserInput/
│                   ├── AddInput.tsx
│                   ├── AddInput.css
|          ├── DateAndTime/
│                   ├── DayAndDate.tsx
│                   ├── DayAndDate.css
|          ├── ToDoItemList/
│                   ├── ToDoList.tsx
│                   ├── ToDoList.css
|          ├── ToDoSingleItem/
│                   ├── ToDoSingleItem.tsx
│                   ├── ToDoSingleItem.css
|          └── Ui/
│                   ├── card.css
│                   ├── Card.tsx
│                   ├── CardComponent.tsx
|   ├──context/
│          ├── Context.tsx
|   ├──hooks/
│          ├── usegetTime.tsx
│
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.js
│   └── index.js
├── README.md
├── tsconfig.node.json
├── package-lock.json
├── tsconfig.json
├── package.json
└── vite.config.js
## Components

**1. App**

- `App` the main component that is rendered when the site is loaded.

**2. Card**

- `Card` is the main container that is the body of the todo list.
TO-DO-LIST(WORKING)/
├── src/
|   ├──component/
|          ├── DateAndTime/
│                   ├── DayAndDate.tsx
│                   ├── DayAndDate.css
|          ├── ToDoItemList/
│                   ├── ToDoList.tsx
│                   ├── ToDoList.css

DayAndDate

![Image 1] (./src/assets/datecomponent.png)

- `Card` also has Current Day and time which is imported from
TO-DO-LIST(WORKING)/
├── src/
|   ├──hooks/
│          ├── usegetTime.tsx


**3. CardHeader**

- `CardHeader` contains the the details regarding date, time and the day.

**4. TaskList**

- `TaskList` contains the list of tasks and the checkbox.
- The tasks that are completed are marked as checked.

**5. AddTaskButton**

- `AddTaskButton` contains the button using which we can add new tasks in the todo list.
- Since the data is static here, currently only the tasks that are present in the data can be seen in the list.

link:- https://to-do-list-simform.netlify.app/
```
