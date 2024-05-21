import React, { useState } from 'react';
import './App.css';
import './index.css';
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo => (todo.id === updatedTodo.id? updatedTodo : todo));
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const handleDeleteTodo = (todo: Todo) => {
    const updatedTodos = todos.filter(t => t.id!== todo.id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingTodo && editingTodo.id === todo.id? (
              <>
                <input
                  type="text"
                  value={editingTodo.title}
                  onChange={(e) => handleUpdateTodo({...editingTodo, title: e.target.value })}
                />
                <button onClick={() => handleUpdateTodo(todo)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;