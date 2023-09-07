import { useState } from "react";
import Button, { SelectButton } from "./Button";

import classes from "./AppHeader.module.css";
import buttonClasses from "./Button.module.css";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const filterHandler = (event) => {
    dispatch(updateFilterStatus(event.target.value));
  };

  return (
    <div className={classes.appHeader}>
      <Button
        type="button"
        className={`${buttonClasses["button--primary"]}`}
        onClick={modalOpenHandler}
      >
        Add Task
      </Button>

      <SelectButton
        id="status"
        className={`${buttonClasses[`button--secondary`]}`}
        value={filterStatus}
        onChange={filterHandler}
      >
        <option value="all">ALL</option>
        <option value="completed">COMPLETE</option>
        <option value="incomplete">INCOMPLETE</option>
      </SelectButton>
      {modalOpen && <TodoModal type="add" onClose={modalCloseHandler} />}
    </div>
  );
}

export default AppHeader;
