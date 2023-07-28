import React, {useState} from "react";

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')


const handleInputChange = (event) => {
    setTask(event.target.value)
}

const handleSubmit = () => {
    if(task.trim() === '') return;
    const newTodo = {
        id: Date.now(),
        title: task,
        status: 'pending',
    };
    setTodos([...todos, newTodo]);
    setTask([''])
}

const handleStatusChange = (id) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id 
    ? {...todo, status: todo.status === 'pending' ? 'completed' : 'pending'}
    : todo
  );
  setTodos(updatedTodos)
}

const handleRemoveTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
}

return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input type="text" value={task} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Add Task</button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-card" key={todo.id}>
            <span className="todo-number">{index + 1}</span>
            <h3>{todo.title}</h3>
            <div className="todo-status" onClick={() => handleStatusChange(todo.id)}>
              Status: {todo.status}
            </div>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
 }

export default Todo;