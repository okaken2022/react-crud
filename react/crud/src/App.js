import { useState, useEffect } from "react";
import "./styles.css";

import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForms";
import EditForm from "./components/EditForm";

export default function App() {
  // need state to keep track of todos
  const [todos, setTodos] = useState(()=> {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    //保存されたtodoがあった場合
    if (savedTodos) {
    // 解析された JSON オブジェクトを JavaScript オブジェクトに戻す
      return JSON.parse(savedTodos);
    //それ以外は空の配列を渡す
    } else {
      return [];
    }
  });

  // need state to keep track of the value in the input
  const [todo, setTodo] = useState("");

  // 編集中かどうかを知るためのブール値の状態 (これにより、表示することができます
  // 条件に基づく異なる入力 (条件付きレンダリング)
  const [isEditing, setIsEditing] = useState(false);
  // オブジェクトの状態を設定して、編集中の todo アイテムがわかるようにします
  const [currentTodo, setCurrentTodo] = useState({});

  // コンポーネントがマウントされたら、useEffect を実行
  useEffect(() => {
    //localstorage は文字列をキーと値として保存することのみをサポートする。
    //したがって、オブジェクトを変換せずに配列とオブジェクトを格納することはできない。
    //最初に文字列に変換する。 JSON.stringify はオブジェクトを JSON 文字列に変換する
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  //---------------------------インプットの値と新たなstateを取得するための関数---------------------------
  function handleAddInputChange(e) {
    //入力欄にあるものをstateに
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  //---------------------------フォーム送信時に新しいオブジェクトを作成する関数---------------------------
  const handleAddFormSubmit = (e) => {
    //form 要素のデフォルト動作を抑止する
      e.preventDefault();
      // 入力がからの場合は送信しない
      if (todo !== "") {
        //新しいto do のstateを配列で設定
        setTodos([
          //現在のtodo のstateをコピー
          ...todos,
          //オブジェクトを識別するための基本 ID の設定
          {id: todos.length +1,
          //テキスト プロパティを todo 状態の値に設定し、入力から空白を取り除く
          text: todo.trim()}]);
      }
    //入力ボックスをクリア
    setTodo("");
  }


  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    // handleUpdateTodo 関数を呼び出します - currentTodo.id と currentTodo オブジェクトを引数として渡します
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  //---------------------------todoをリストから削除するための関数---------------------------
  const handleDeleteClick = (id) => {
    //ここでフィルタリング - ボタンのクリックで todo 配列からアイテムを削除
    const removeItem = todos.filter((todo) => {
      //削除する項目に一致しない残りの Todo を返す
      return todo.id !==id;
    })
    //removeItem は新しい配列を返す。 todo を新しい配列に設定する
    setTodos(removeItem);
  }

  //---------------------------todo アイテムを編集する関数---------------------------
  const handleUpdateTodo = (id, updatedTodo) => {
    // ここでは todos 配列をマッピングしています - todo.id が関数に渡す ID と一致するかどうかをチェックするという考え方です
    // ID が一致する場合、2 番目のパラメータを使用して更新された todo オブジェクトを渡します
    // それ以外の場合は、古い todo を使用します
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    // この関数は onSubmit 関数内で使用されるため、編集を false に設定します。これは、データが送信され、編集していないことを意味します
    setIsEditing(false);
    // 更新された todo で todos の状態を更新します
    setTodos(updatedItem);
  }

  //---------------------------編集入力の値を取得して新しい状態を設定する関数---------------------------
  const handleEditChange = (e) => {
    // 新しい状態値を編集入力ボックスの現在の値に設定します
    setCurrentTodo({...currentTodo, text: e.target.value});
    console.log(currentTodo);
  }

  //---------------------------「編集」ボタンがクリックされたときに処理する関数---------------------------
  const handleEditClick = (todo) => {
    //編集をtrueに設定
    setIsEditing(true);
    // currentTodo を、クリックされた todo アイテムに設定します
    setCurrentTodo({...todo});
  }
  //---------------------------JSX---------------------------
  return (
    <div className="App">
      {/* 編集モードかどうかに基づいて、さまざまな入力を条件付きでレンダリングする必要があります */}
      {isEditing ? (
        // 編集中の場合 - 編集 todo 入力を表示します
        // "onSubmit" prop に handleEditFormSubmit 関数を必ず追加してください
        // <form onSubmit={handleEditFormSubmit}>
        //   {/* h2 要素を追加しました */}
        //   <h2>Edit Todo</h2>
        //   {/* 入力のラベルも追加されました */}
        //   <label htmlFor="editTodo">Edit todo: </label>
        //   {/* update 入力の値が currentTodo 状態に設定されていることに注意してください */}
        //   {/* また、handleEditInputChange が使用されていることにも注意してください */}
        //   <input
        //     name="editTodo"
        //     type="text"
        //     placeholder="Edit todo"
        //     value={currentTodo.text}
        //     onChange={handleEditInputChange}
        //   />
        //   {/* ここに「update」ボタン要素を追加しました - ボタンで type="submit" を使用すると、handleEditFormSubmit 関数を使用してクリックするとフォームが送信されます */}
        //   <button type="submit">Update</button>
        //   {/* ここで、編集モードをキャンセルする isEditing 状態を false に戻す「キャンセル」ボタンを追加しました */}
        //   <button onClick={() => setIsEditing(false)}>Cancel</button>
        // </form>
        <EditForm
        currentTodo = {currentTodo}
        setIsEditing = {setIsEditing}
        onEditInputChange = {handleEditInputChange}
        onEditFormSubmit = {handleEditFormSubmit}
        />
      ) : (
        // 編集していない場合 - add todo 入力を表示します
        // "onSubmit" prop に handleFormSubmit 関数を必ず追加してください
        // <form onSubmit={handleFormSubmit}>
        //   {/* h2 要素を追加しました */}
        //   <h2>Add Todo</h2>
        //   {/* 入力のラベルも追加されました */}
        //   <label htmlFor="todo">Add todo: </label>
        //   {/* 値がまだ todo 状態に設定されていることに注意してください */}
        //   {/* handleInputChange が同じであることにも注意してください */}
        //   <input
        //     name="todo"
        //     type="text"
        //     placeholder="Create a new todo"
        //     value={todo}
        //     onChange={handleInputChange}
        //   />
        //   {/* ここでは、「追加」ボタン要素を追加しました。ボタンで type="submit" を使用すると、handleFormSubmit 関数を使用してクリックするとフォームが送信されます */}
        //   <button type="submit">Add</button>
        // </form>
        <AddTodoForm
          todo = {todo}
          onAddInputChange = {handleAddInputChange}
          onAddFormSubmit = {handleAddFormSubmit}
        />
      )}

      {/* すべてのリスト項目を保持する ul を作成 */}
      <ul className="todo-list">
        {/* すべての todo に対して新しい li 要素を作成する todos 配列をmap */}
        {todos.map((todo) => (
          // <li key={todo.id}>
          //   {todo.text}
          //   {/* 上で作成した関数を onClick ハンドラとして追加します
          //   handleDeletClick 関数は、削除したいアイテムを知る必要があることを思い出してください
          //   したがって、todo.id を関数に渡す必要があります。
          //   handleDeleteClick 関数を呼び出す方法に注意してください。
          //   ボタンがクリックされたときではなく、ページの読み込み時に関数を実行します */}
          //   {/* todo オブジェクト全体を handleEditClick 関数に渡します*/}
          //   <button onClick={() => handleEditClick(todo)}>Edit</button>
          //   <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          // </li>
          <TodoItem
            todo = {todo}
            onHandleEditClick = {handleEditClick}
            onHandleDeleteClick = {handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}
