import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

import classes from "./TodoItem.module.css";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

function TodoItem(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (props.todo.status === "completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [props.todo.status]);

  const deleteHandler = () => {
    dispatch(deleteTodo(props.todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const updateHandler = () => {
    setOpenModal(true);
  };

  const modalCloseHandler = () => {
    setOpenModal(false);
  };

  const checkHandler = () => {
    setChecked(!checked);
    // console.log(checked);

    //Here, the checked value which we're passing is not the updated one which we're in 2-lines above,
    //which is why we're sending the reverse statuses with dispatch() to get the correct outcome. 
    dispatch(
      updateTodo({
        ...props.todo,
        status: checked ? "incomplete" : "completed",
      })
    );
  };

  return (
    <>
      <div className={classes.item}>
        <div className={classes.todoDetails}>
          <CheckButton checked={checked} onCheckBox={checkHandler} />
          <div className={classes.texts}>
            <p
              className={`${classes.todoText} ${
                props.todo.status === "completed" && classes.todoTextCompleted
              }`}
            >
              {props.todo.title}
            </p>
            <p className={classes.time}>
              {format(new Date(props.todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={classes.todoActions}>
          <div
            className={classes.icon}
            onClick={deleteHandler}
            onKeyDown={deleteHandler}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={classes.icon}
            onClick={updateHandler}
            onKeyDown={updateHandler}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {openModal && (
        <TodoModal
          todo={props.todo}
          type="update"
          onClose={modalCloseHandler}
        />
      )}
    </>
  );
}

export default TodoItem;
