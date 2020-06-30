import React, { useState, useRef, useEffect } from 'react'; // useState hook. useRef allows to reference ele inside the HTML. (in the  if for handleAddTodo to access the value of tje input box)
import TodoList from './TodoList';
// import uuidv4 from 'uuid/v4'; // THIS ONE IS DEPRACTED, USE THE NEXT ONE
import { v4 as uuid_v4 } from "uuid";  //to generate random ids. use npm i uuid. Also, I could use npm i react-uuid

const LOCAL_STORAGE_KEY = 'todosApp.todos';



// when the state changes, React re renders
// all the thing we want to return, if there are < 1, use parentesis
// TodoList is defined in a separated file: TodoList.js
// we can only send 1 element in the return, :. we are using an empty wrap
function App(){
  // useStates return an array, so we can de Destructuring it
  const [todos, setTodos] = useState([ ]);  // todos and setTodos are variables that take the value from userState, can be w = name, or position in the array. setTodos is the name of a funtion
  const todoNameRef = useRef();

    //getting
  // load once fron localStorage. And to be called only once we have the 2nd parameter as empty array
  useEffect( () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, [])

  // storing
  //this function will be called anytime something changes. We need the useEffect hook for this one
  // is a function w 2 parameters: 1 function which do things when something changes. 2nd parameter is an array of properties that said when to call the function. Averything this array changes
  // we want to execute this function
  useEffect(() => {
    console.log(todos);
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(todos) );
  }, [todos])
  //everytime this array changes, we will call this function

  function toggleTodo(id){
    // create a copy of the last todos. in React we NEVER CHANGE a current state, we create a new variable
    // with the copy, we set a new state
    const newTodos = [...todos];
    const todo = newTodos.find( todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    // whatever ele is current refencing
    const name = todoNameRef.current.value; //have access to whatever is inside the inputbox
    if (name === '') return;
    // setting the todos
    setTodos( prevTodos => {
      return [...prevTodos, {id: uuid_v4(), name:name, complete:false}]
    })
    // clean the input
    todoNameRef.current.value = null;
  }

function handleClearTodos(){
  const newTodos = todos.filter(todos => !todos.complete);
  setTodos(newTodos);
}

  return(
    <>
    {/* we need to pass function toggleTodo as a parameter  to the todo list */}
      <TodoList todos = { todos } toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={ handleAddTodo } > Add Todo</button>
      <button onClick={handleClearTodos} > Clear completed</button>
      <div> {todos.filter(todo => !todo.complete).length} Left To Do</div>
    </>
)
}

export default App;