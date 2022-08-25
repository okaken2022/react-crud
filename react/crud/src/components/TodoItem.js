// ここで小道具を分解していることに注意してください。これを次のように変更できます
// 代わりに props を取り込み、`props.` を todo、onEditClick、および onDeleteClick に追加します。
// デフォルト関数 TodoItem(props) をエクスポートします
export default function TodoItem({
  // todo をpropとして渡す
  todo,
  // 関数 handleEditClick の名前が onEditClick に変更されたことに注意してください
  onEditClick,
  // 関数 handleDeleteClick の名前が onDeleteClick に変更されたことに注意してください
  onDeleteClick
}) {
  return (
    // li 要素を親として使用 
    <li key={todo.id}>
      {todo.text}
      {/* 関数の名前を変更することを忘れないでください */}
      <button onClick={() => onEditClick(todo)}>Edit</button>
      <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
    </li>
  );
}