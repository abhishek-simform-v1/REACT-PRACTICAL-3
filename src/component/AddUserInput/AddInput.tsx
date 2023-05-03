import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/Context";
import "./AddInput.css";
import Swal from "sweetalert2";
import usegetTime from "../../hooks/usegetTime";

interface DataItem {
  id: number;
  task: string;
  completed: number;
  createdAt: number;
}

// Define a Toast notification using SweetAlert library with specific configurations
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

// Define a functional component for an input field with add functionality
const AddInput = () => {
  // Define the state variables for the input field, whether the user wants to add an item or not, and an error message
  const [inputValue, setInputValue] = useState("");
  const [wantToAdd, setWantToAdd] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, setData } = useContext(TodoContext);
  const [error, setError] = useState("");
  // Get the current time using a custom hook
  const time = usegetTime();
  // Get the date from the time object
  const date: number = time[0].getDate;

  // Add an event listener to the Esc key to reset the input field if the user wants to cancel the add operation
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
  }, [data]);

  // Handle changes in the input field value
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Check if the input value is less than or equal to 10 characters and if there is any existing data, show an error message
    if (inputValue.length <= 10) {
      console.log("write more");
      if (data.length !== 0) {
        setError(" Write 'DELETE' to delete every thing!!!");
      }
    } else {
      setError("");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Display a success message using a toast
    Toast.fire({
      icon: "success",
      title: "Item Added SuccessFully",
    });

    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if the input value is empty after trimming whitespace
    if (inputValue.trim() === "") {
      // Display an error message using a toast if the input is empty
      Toast.fire({
        icon: "error",
        title: "write more than 10 character",
      });
      return;
    }

    // Clear the input value after adding it to the data array
    setInputValue("");
    setData((prevData: DataItem[]) => [
      ...prevData,
      {
        id: Math.trunc(Math.random() * 89345),
        task: inputValue.trim(),
        completed: 0,
        createdAt: date,
      },
    ]);

    // Check if the input value contains the word "DELETE"
    checkInput(inputValue);
  };

  const handleClasses = () => {
    // Focus on the input field and hide the form
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
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
        setData([]);
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
