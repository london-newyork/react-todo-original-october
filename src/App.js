import React,{ useState, useEffect } from 'react'


// const App = () => {
//   const [todos,setTodos] = useState("")
//   const [todo,setTodo] = useState("")

//   const handleInput = (e) => {
//     setTodo(e.target.value)
//   }
//   const handleAddTodolist = () =>{
//     setTodos(todo)
//     setTodo("")
//   }
 
//   return (
//     <div>
//       <p>Todo:{todos}</p>
//       <input type="text" value={todo} onChange={handleInput} />
//       <input type="button" value="入力"　onClick={handleAddTodolist}/>
//     </div>
//   )
// }
// export default App

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  // const [state, dispatch] = useReducer()

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

const handleAddTodoList = e => {//handleAddTodoListはボタンをクリックされたらリストに対して値を渡す
  e.preventDefault();
  // console.log('This is handleAddTodoList')

  if( todo !== "" ){
    const newTodos = [todo]
    setTodos(newTodos)
  }
}

const handleEditTodoList = id => {
  const newTodoList = [...todos]
  newTodoList.splice(id,1)
  setTodo(newTodoList)
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
          onClick={handleAddTodoList}>{/**クリックしてhandleAddTodolistへ渡す */}
          Add
        </button>
      </form>
      
      <h2>My Todo List</h2>
      <ul>
        {todos.map((todo,index) => (
          <li key={index}>
            <ul>
              <li>{index}</li>
              <li>{todos}</li>
              <button
              type="button"
              onClick={handleEditTodoList}>
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
