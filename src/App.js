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
  const [currentTodo, setCurrentTodo] = useState({})
  // const [currentTodoText, setCurrentTodoText] = useState("")
  const [disable, setDisable] = useState(true)
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

function handleGetInputValue(e) {
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
    const newTodos = [...todos, { id: new Date().getTime(), text: todo.trim() }]
    setTodos(newTodos)
  }
}

const handleEditInputChange = (e,id) => {
  // setCurrentTodo({...currentTodo, text: e.target.value})
  // console.log(currentTodo.text)

  // setCurrentTodo("")//一度初期化すれば文字は空になるはず→ならない→全く消してしまうと逆に不便なので元の文字列残す。
  
  // setCurrentTodo({
  //   ...todo,//元々入力されているtodoを展開
  //   text: e.target.value//現在の入力値を取得する
  // })

  // setTodos(currentTodo.text)//setCurrentTodoで定義したcurrentTodoがtodosに入るはず => エラー todos.map is not a function.
  // setCurrentTodo(todo.text) => エラー
  console.log(e.target.value)
  //todosを取得する
  //今書いているtodoをtodosから見つける
  const getEditedTodo = todos.filter((todo) => {
    //ただのidは今編集しているtodoのid, todo.idはfilterで回しているtodoの配列のid returnで　trueが返る。（filter関数なのでtrueがかえる）
    return todo.id == id 
  })
  
  //配列が返るがtodoが欲しい。ただし1つのリストしか返ってこない
  console.log(getEditedTodo[0])
  const todo = getEditedTodo[0]

  //見つかったtodoのテキストを変える
  //todoの更新ができる
  todo.text = e.target.value

  //todosリスト全体の取得のためにtodosの中身をコピーしてくる
  const copyTodos = [...todos]

  //indexが取得できる
  const Index = copyTodos.findIndex(todo => todo.id == id)
  copyTodos[Index] = todo
  console.log(Index)

  //編集したいtodo(reactだと期待したように編集前のtodoが出ないが)
  console.log(copyTodos[Index])

  //編集ずみのtodo
  console.log(todo)

  //todosをsetTodosへ戻す
  setTodos(
    copyTodos
    )
}

function handleDeleteTodo(id) {

  const removeTodo = todos.filter((todo) => {//filterでtodosからtodoとして
    return todo.id !==　id//todo.idと異なるidを切り出す　→ なぜ？
  })
  setTodos(removeTodo)//もう一度todosにセットし直す
}

function handleUpdateTodo(id, updatedTodo){
const updatedItem = todos.map((todo)=> {
  return todo.id === id ? updatedTodo : todo//idがtodo.idとマッチしている時は新しいTodoを返す
})
  setTodo(updatedItem)
  console.log(updatedItem)
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
          onChange={handleGetInputValue}
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
              <li>
                <input
                  name="todo"
                  type="text"
                  value={todo.text}
                  onChange={(e)=>handleEditInputChange(e,todo.id)}//event以外も取得する場合は(e)=>関数(e,__)という書き方をする
                  style={{border: 0}}
                  disabled={disable}
                />
              </li>
              <select>
                <option>未着手</option>
                <option>進行中</option>
                <option>完了</option>
              </select>
              <button
                type="button"
                onClick={() => setDisable(false)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={()=> handleUpdateTodo()}
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
              <button>
                Detaile
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
