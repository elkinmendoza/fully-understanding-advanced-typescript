import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'

import React from 'react';
import TodoList from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Todo } from './todo.model';
function App(): React.ReactElement {
  const [todos,setTodo] = useState<Todo[]>([]);


  const todoAddHandler = ( text:string ) => {


    setTodo(prevTodos=>[...prevTodos,{id:Math.random().toString(),text:text}])

  };

  const deleteHandler = (todoId:string) => {
    setTodo(prevTodos =>{
        return prevTodos.filter(todo => todo.id !=todoId)
    })
};

  return (
    <>

    <NewTodo onAddTodo={todoAddHandler}>

    </NewTodo>
    <TodoList items={todos}  onDeleteTodo={deleteHandler}>

    </TodoList>
    </>
  )
}

export default App
