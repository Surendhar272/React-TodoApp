import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";


const TodoItem = ({ todo, onDelete, onEdit, onComplete }) => {
  const [temporaryTodos, setTemporaryTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() !== '') {
        // Check if the edited task is one of the newly added tasks
        if (temporaryTodos.some((tempTodo) => tempTodo === todo)) {
          const updatedTemporaryTodos = temporaryTodos.map((tempTodo) => {
            if (tempTodo === todo) {
              return { ...tempTodo, title: editedTitle };
            }
            return tempTodo;
          });
  
          setTemporaryTodos(updatedTemporaryTodos);
        } else {
          // If not a newly added task, perform the API update
          onEdit(todo.id, editedTitle);
        }
      setIsEditing(false);
    }
  };

  const handleInputChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleComplete = () => {
    onComplete(todo.id);
  };

  

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    {isEditing ? (
      <div className="edit-form">
        <input
          type="text"
          value={editedTitle}
          onChange={handleInputChange}
        />
        <button className="btn btn-success save-button" onClick={handleSaveEdit}>Save</button>
        <button className="btn btn-secondary cancel-button" onClick={handleCancelEdit}>Cancel</button>
      </div>
    ) : (
      <>
        <div className="todo-item-left">
          <FontAwesomeIcon
            icon={todo.completed ? faCircleCheck : faCircle}
            className="complete-icon"
            onClick={handleComplete}
          />
          <span className="todo-text">{todo.title}</span>
        </div>
        <div className="todo-item-right">
          <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={handleEdit} />
          <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => onDelete(todo.id)} />
        </div>
      </>
    )}
  </div>
  );
};

export default TodoItem;
