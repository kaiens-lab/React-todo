import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./Input";
import TodoItem from "./TodoItem";

function App() {
  // 初始化 `todos` 狀態，從 localStorage 讀取，如果沒有則預設為空陣列
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [filterTodos, setFilterTodos] = useState(todos);

  // 每當 `todos` 改變時，更新 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 當 `todos` 改變時，自動更新篩選後的 `filterTodos`
  useEffect(() => {
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
