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
  const [todos, setTodos] = useState([])//配列がセットされているので、以降はずっと配列が来る
  const [todo, setTodo] = useState("")//文字列がセットされているので、以降はずっと文字列が来る
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
        //new Date()だけだとエラー。00:00:00という状態だとidが表示できないため、getTime()でただの数字に修正。
        //ただし、これでも海外にいる人だと何かエラーが起こる可能性がある。UUIDを使った方が本当はいい。
        id: new Date().getTime(),
        // id: todos.length + 1,//これだと、リストの１つを削除したときに順番がおかしくなる
        text: todo.trim()
      }
    ])
  }

  setTodos([])
}

const handleAddTodoList = e => {//handleAddTodoListはボタンをクリックされたらリストに対して値を渡す
  e.preventDefault();
  // console.log('This is handleAddTodoList')

  if( todo !== "" ){
    // console.log(todos)
    console.log(todo.trim())
    const newTodos = [...todos, { id: new Date().getTime(),text: todo.trim() }]
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
        {todos.map((todo) => (
          <li key={todo.id}>
            <ul>
              <li>{todo.id}</li>
              <li>{todo.text}</li>
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
