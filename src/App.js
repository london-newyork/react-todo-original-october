import React,{ useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  // const waiting = "Waiting"
  // const working = "Working"
  // const completed = "Completed"

//   const todoStatusList = () => {
//     return (
//     <select>
//       <option>{waiting}</option>
//       <option>{working}</option>
//       <option>{completed}</option>
//     </select>
//     )
// }

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
},[todos])

function handleInputChange(e) {
  setTodo(e.target.value)
}

function handleFormSubmit (e) {
  e.preventDefault()

  if( todo !== "" ){
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: todo.trim()
      }
    ])
  }

  setTodos("")
}

function handleAddTodoList () {
  if( todo !== "" ){
    const newTodos = [todo]
    setTodo(newTodos)
    console.log(newTodos)
  }
}

  return (
    <>
      <h2>Create A New Todo</h2>
      <form className="CreateNewTodo" onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          value={todo}
          placeholder="type your todo here"
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          onClick={()=>handleAddTodoList(todo)}>
          Add
        </button>
      </form>
      
      <h2>My Todo List</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <ul>
              <li>{setTodo(todo)}</li>
              <button
              type="button"
            >
              Edit
            </button>
            <button
              type="button"
            >
              Delete
              </button>
            </ul>
          </li>
        ))}
      </ul>

      <h2>Detaile</h2>
      <div>
        id
        TodoTitle   
        <button>Edit</button>
        <p>
          texttexttexttexttext
        </p>
      </div>
    </>
  )
}

export default App
