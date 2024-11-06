import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./Input";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilterTodos(todos);
  }, [todos]);

  return (
    <div className="container">
      <h1 className="todo-title">todos</h1>
      <Input
        todos={todos}
        setTodos={setTodos}
        setFilteredTodos={setFilterTodos}
      />
      <TodoItem
        todos={todos}
        setTodos={setTodos}
        filterTodos={filterTodos}
        setFilterTodos={setFilterTodos}
      />
    </div>
  );
}

export default App;
