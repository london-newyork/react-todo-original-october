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

  return (
    <>
      <h2>Create A New Todo</h2>
      <form className="CreateNewTodo">
        <input
          name="todo"
          type="text"
          value={todo}
          placeholder="type your todo here"
        />
        {/* <button onClick={}>Add</button> */}
      </form>
      
      <h2>My Todo List</h2>
      <ul className="todo-list">
        {todos.map((todo) =>(
          <li key={todo.id}>
            <ul>
              <li>{todo.text}</li>
              {/* <li>{todoStatusList}</li> */}
            </ul>
            <button>Edit</button>
            <button>Delete</button>
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
