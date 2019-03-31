import React, {useState} from 'react';
import AppStylesCss from './App.module.css';

const Todo = ({ todo, index, completeTodo, removeTodo }) => (
  <div
    className={AppStylesCss.todo}
    style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
  >
    {todo.text}

    <div>
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>x</button>
    </div>
  </div>
);

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    { text: 'Learn about React', isCompleted: false },
    { text: 'Meet friend for lunch', isCompleted: false },
    { text: 'Build really cool todo app', isCompleted: false },
  ]);

  const addTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo }]);
  };

  const completeTodo = (updateIndex) => {
    const updatedTodos = todos.map((todo, index) => {
      if (updateIndex === index) {
        return Object.assign({}, todo, { isCompleted: true });
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const removeTodo = (deleteIndex) => {
    const updatedTodos = todos.filter((todo, index) => index !== deleteIndex);
    setTodos(updatedTodos);
  };

  return (
    <div className={AppStylesCss.app}>
      <div className={AppStylesCss['todo-list']}>
        {todos.map((eachTodo, index) => (
          <Todo
            key={index}
            index={index}
            todo={eachTodo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
