import React from 'react';
import Todo from './Todo';  // todo element or component


// everything in {} means js code n
export default function TodoList( { todos, toggleTodo }) {
return (
  todos.map(todo => {
    // we are using a key to let react know just to render the one that had changes.
    // react don't render all everything single time
    return <Todo key={ todo.id } toggleTodo={toggleTodo}  todo = {todo} /> 
  })
)
}
