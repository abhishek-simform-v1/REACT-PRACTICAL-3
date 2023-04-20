import DayAndDate from "../DateAndTime/DayAndDate";
import "./card.css";
import CardComponent from "./../UI/CardComponent";
import ToDoList from "../ToDoItemList/ToDoList";
import Context from "../../context/Context";
function Card() {
  return (
    <Context>
      <CardComponent className="card">
        <DayAndDate />
        <ToDoList />
      </CardComponent>
    </Context>
  );
}

export default Card;
