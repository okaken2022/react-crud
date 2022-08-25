export default function AddTodoForm({
  // todo をpropとして渡す
  todo,
  // 関数 handleAddFormSubmit の名前が onAddFormSubmit に変更されていることに注意してください
  onAddFormSubmit,
  // 関数 handleAddInputChange の名前が onAddInputChange に変更されていることに注意してください
  onAddInputChange
}) {
  return (
    // フォーム要素を親として使用
    // onSubmit および onChange props の関数名の変更に注意してください
    <form onSubmit={onAddFormSubmit}>
      <h2>Add Todo</h2>
      <label htmlFor="todo">Create todo: </label>
      <input
        name="todo"
        type="text"
        placeholder="Create new todo"
        value={todo}
        onChange={onAddInputChange}
      />
    </form>
  );
}