import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import { toast } from "react-toastify";
import AddTodoForm from "./AddTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedFilter, setCompletedFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=8"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

 

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`
      );
      setTodos(todos.filter((todo) => todo.id !== todoId));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = async (todoId, newTitle) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: newTitle };
        }
        return todo;
      });
  

      await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        title: newTitle,
      });
      
      setTodos(updatedTodos);
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleComplete = async (todoId) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        updatedTodos
      );
      setTodos(updatedTodos);
      toast.info("Todo marked as completed!");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  // Filtering logic based on completedFilter
  const filteredTodos =  todos.filter((todo) => {
    if (completedFilter === "completed") {
      return todo.completed;
    } else if (completedFilter === "uncompleted") {
      return !todo.completed;
    }
    return true; // Show all tasks
  });

  return (
    <div className="container">
      <h1>
        {" "}
        <FontAwesomeIcon icon={faClipboardList} /> Todo List App
      </h1>
      <AddTodoForm onTodoAdded={handleTodoAdded} />
      <div className="todo-list">
        <div className="row ">
          <div className="col-md-12">
            <div className="dropdown float-end">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="filterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setCompletedFilter("all")}
                  >
                    All Tasks
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setCompletedFilter("completed")}
                  >
                    Completed Tasks
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setCompletedFilter("uncompleted")}
                  >
                    Uncompleted Tasks
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="completed-count">
              <b>Completed Tasks: {completedCount}</b>
            </div>
          </div>
        </div>

        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
