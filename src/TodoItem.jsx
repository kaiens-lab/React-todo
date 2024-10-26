import React, { useState, useEffect } from "react";
import { ReactComponent as EditIcon } from "./icons/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "./icons/icon-delete.svg";

const TodoItem = ({ todos, setTodos, filterTodos, setFilterTodos }) => {
  const [isEditing, setIsEditing] = useState(null); // 用來追蹤哪個項目正在編輯
  const [newText, setNewText] = useState(""); // 用來保存編輯後的文字

  const tagAllHandler = () => {
    setFilterTodos(todos);
  };

  const tagUndoHandler = (index) => {
    const undoTasks = todos.filter((e) => e.completed === false);
    setFilterTodos(undoTasks);
  };

  const tagCompletedHandler = (index) => {
    const doneTasks = todos.filter((e) => e.completed === true);
    setFilterTodos(doneTasks);
  };

  // 使用 id 的處理函數
  const editHandler = (id) => {
    setIsEditing(id);
    const todo = todos.find((t) => t.id === id);
    setNewText(todo.text);
  };

  const saveHandler = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
  };

  const deleteHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const checkHandler = (e, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: e.target.checked } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-items">
      <div className="todo-tag">
        <span onClick={() => tagAllHandler()}>All</span>
        <span onClick={() => tagUndoHandler()}>Undo</span>
        <span onClick={() => tagCompletedHandler()}>Completed</span>
      </div>
      {[...filterTodos]
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .map((todo) => (
          <div key={todo.id} className="todo-row hover-effect">
            {isEditing === todo.id ? (
              <input
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <div
                className="checkAndText"
                style={{
                  color: todo.completed ? "gray" : "black",
                  textDecoration: todo.completed ? "line-through" : "none",
                  textDecorationColor: todo.completed ? "var(--main)" : "none",
                  backgroundColor: todo.completed
                    ? "var(--lightGray)"
                    : "transparent",
                }}
              >
                <div className="check-container">
                  <input
                    type="checkbox"
                    id={`checkbox-${todo.id}`}
                    checked={todo.completed}
                    onChange={(e) => checkHandler(e, todo.id)}
                  ></input>
                  <label htmlFor={`checkbox-${todo.id}`}></label>
                </div>
                <div className="text-container">
                  <p>{todo.text}</p>
                </div>
              </div>
            )}
            <div className="buttons">
              {isEditing === todo.id ? (
                <button
                  onClick={() => saveHandler(todo.id)}
                  className="save-btn"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => editHandler(todo.id)}
                    className="edit-btn"
                  >
                    <EditIcon className="edit-icon" />
                  </button>
                  <button
                    onClick={() => deleteHandler(todo.id)}
                    className="delete-btn"
                  >
                    <DeleteIcon className="delete-icon" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoItem;
