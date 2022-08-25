export default function EditForm({
  // まだ currentTodo が必要です
  currentTodo,
  // また、setIsEditing を切り替えることができる必要があります
  setIsEditing,
  // 関数 handleEditInputChange の名前が onEditInputChange に変更されていることに注意してください
  onEditInputChange,
  // 関数 handleEditFormSubmit の名前が onEditFormSubmit に変更されていることに注意してください
  onEditFormSubmit
}) {
  return (
    // フォーム要素を親として使用
    // onSubmit および onChange props の関数名の変更に注意してください
    <form onSubmit={onEditFormSubmit}>
      <h2>Edit Todo</h2>
      <label htmlFor="updateTodo">Update todo: </label>
      <input
        name="updateTodo"
        type="text"
        placeholder="Update todo"
        value={currentTodo.text}
        onChange={onEditInputChange}
      />
      <button type="submit" onClick={onEditFormSubmit}>
        Update
      </button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
}