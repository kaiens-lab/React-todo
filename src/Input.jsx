import React, { useState } from "react";

const Input = ({ todos, setTodos, setFilteredTodos }) => {
  let [input, setInput] = useState("");

  const submitButton = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo = {
        id: Date.now(), // 新增唯一 id
        text: input,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos); // 更新所有事項
      setFilteredTodos(updatedTodos); // 更新篩選結果
      setInput("");
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="newtodo-area">
      <input
        onChange={inputHandler}
        value={input}
        type="text"
        className="input-area"
      ></input>
      <button onClick={submitButton} className="add-btn">
        +
      </button>
    </div>
  );
};

export default Input;
