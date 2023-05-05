import React, { useEffect, useRef, useState } from "react";
import "./AddInput.css";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteToDo, Toast } from "../../slice/toDoSlice";
interface DataItem {
  id: number;
  task: string;
  completed: boolean;
  createdAt: number;
}

// Define a functional component for an input field with add functionality
const AddInput = () => {
  const ToDo = useSelector((state: any) => state.todo.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [wantToAdd, setWantToAdd] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setInputValue("");
        setWantToAdd(true);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [ToDo]);

  // // Handle changes in the input field value
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Check if the input value is less than or equal to 10 characters and if there is any existing data, show an error message
    if (inputValue.length <= 10) {
      console.log("write more");
      if (ToDo.length !== 0) {
        setError(" Write 'DELETE' to delete every thing!!!");
      }
    } else {
      setError("");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // setInputValue(inputRef.current!.value);
    e.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    dispatch(
      addTodo({
        id: Math.trunc(Math.random() * 89345),
        task: inputValue.trim(),
        completed: false,
        createdAt: new Date().getDate(),
      })
    );

    setInputValue("");
    // inputRef.current!.value = "";
    checkInput(inputValue);
  };

  const handleClasses = () => {
    // Focus on the input field and hide the form

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (document.activeElement === inputRef.current) {
        console.log("element has focus");
      } else {
        console.log("element does NOT have focus");
      }
    }, 2000);
    setWantToAdd(false);
  };

  function checkInput(string: string) {
    // Create a regular expression to match the word "DELETE" but only if it's not part of another word
    const regex = /(?<!\w)DELETE\b/g;

    // Test if the input value matches the regular expression
    if (regex.test(string)) {
      // If the input value is exactly "DELETE", display an error message and clear the data array
      if (inputValue === "DELETE") {
        Toast.fire({
          icon: "error",
          title: "everything Deleted",
        });
        dispatch(deleteToDo([]));
      }
    } else {
      // If the input value doesn't match the regular expression, return false
      return false;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={wantToAdd ? "hideform" : ""}>
        <input
          type="text"
          className="inputlistitem"
          value={inputValue}
          ref={inputRef}
          onChange={handleInput}
        />

        <p className="errorMessage">{error}</p>
      </form>
      <button
        className={wantToAdd ? "addButton" : "hide"}
        onClick={handleClasses}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="plus"
          className="svg-inline--fa fa-plus "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default AddInput;
