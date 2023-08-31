import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import TodoList from "./components/TodoList";


function App() {

  return (
    <div className="App">
      <TodoList />
      <ToastContainer />
    </div>
  );
}

export default App;
