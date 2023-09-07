import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

import { addTodo, updateTodo } from "../slices/todoSlice";
import Button from "./Button";
import classes from "./TodoModal.module.css";
import buttonClasses from "./Button.module.css";

function TodoModal(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(
    () => {
      if (props.type === "update" /*&& props.todo*/) {
        setTitle(props.todo.title);
        setStatus(props.todo.status);
      } else {
        setTitle("");
        setStatus("incomplete");
      }
    },
    [
      /*props.type, props.todo*/
    ]
  );

  const titleHandler = (event) => {
    setTitle(() => event.target.value);
  };

  const statusHandler = (event) => {
    setStatus(() => event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      if (props.type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added Successfully!");
      }
      if (props.type === "update") {
        if (props.todo.title !== title || props.todo.status !== status) {
          dispatch(updateTodo({ ...props.todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      props.onClose();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div
          className={classes.closeButton}
          onClick={props.onClose}

          //   Find out the use of these 3
          //   onKeyDown={props.onClose}
          //   tabIndex={0}
          //   role="button"
        >
          <MdOutlineClose />
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <h1 className={classes.formTitle}>
            {props.type === "add" ? "Add Task" : "Update Task"}
          </h1>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={titleHandler}
            />
          </label>
          <label htmlFor="status">
            status
            <select value={status} onChange={statusHandler}>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              className={`${buttonClasses[`button--primary`]}`}
            >
              {props.type === "add" ? "Add Task" : "Update Task"}
            </Button>
            <Button
              type="button"
              className={`${buttonClasses[`button--secondary`]}`}
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
