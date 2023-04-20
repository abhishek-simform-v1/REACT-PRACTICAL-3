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

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const AddInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [wantToAdd, setWantToAdd] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, setData } = useContext(TodoContext);
  const [error, setError] = useState("");
  const time = usegetTime();
  const date: number = time[0].getDate;
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
    Toast.fire({
      icon: "success",
      title: "Item Added SuccessFully",
    });
    e.preventDefault();
    if (inputValue.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "write more than 10 character",
      });
      return;
    }
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
    checkInput(inputValue);
  };

  const handleClasses = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
    setWantToAdd(false);
  };

  function checkInput(string: string) {
    const regex = /(?<!\w)DELETE\b/g;
    if (regex.test(string)) {
      if (inputValue === "DELETE") {
        Toast.fire({
          icon: "error",
          title: "everything Deleted",
        });
        setData([]);
      }
    } else {
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
          maxLength={12}
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
