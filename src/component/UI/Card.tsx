// Importing the "DayAndDate" component and the "card.css" file
import DayAndDate from "../DateAndTime/DayAndDate";
import "./card.css";

// Importing the "CardComponent" and "ToDoList" components
import CardComponent from "./../UI/CardComponent";
import ToDoList from "../ToDoItemList/ToDoList";

// Importing the "Context" component
import Context from "../../context/Context";
import ToDoDetails from "../ExtraInfo/ToDoDetails";

// Defining the "Card" component
function Card() {
  // Returning the "CardComponent", which contains the "DayAndDate" and "ToDoList" components
  // Wrapped inside the "Context" component
  return (
    <Context>
      <div className="mainContent">
        <ToDoDetails />
        <CardComponent className="card">
          <DayAndDate />
          <ToDoList />
        </CardComponent>
      </div>
    </Context>
  );
}

// Exporting the "Card" component
export default Card;
