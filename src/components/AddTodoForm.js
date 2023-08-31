import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddTodoForm = ({ onTodoAdded }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo,
          completed: false,
        }
      );


      onTodoAdded(response.data);
      setNewTodo("");
      toast.success("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }

  };

  return (
    <div className="add-todo-form text-center">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                value={newTodo}
                onChange={handleInputChange}
                className="form-control form-control-lg"
                placeholder="Add a new task..."
              />
              <button className="btn btn-primary btn-lg" type="submit">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;
