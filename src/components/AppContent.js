import React from "react";
import { useSelector } from "react-redux";

import TodoItem from "./TodoItem";
import classes from "./AppContent.module.css";

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  // console.log(todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  // console.log(filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={classes.content__wrapper}>
      {filteredTodoList && filteredTodoList.length > 0
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : "no todo"}
      {/* We are putting length check as well bcoz when our application will run the empty list will always be there */}
    </div>
  );
}

export default AppContent;
