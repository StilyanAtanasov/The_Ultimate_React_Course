export function PackingListItem({ item, onCheckItem, onDeleteItem }) {
  return (
    <li key={item.id} className={item.packed ? "checked" : null}>
      <input type="checkbox" checked={item.packed} onChange={() => onCheckItem(item.id)} />
      <span className="item-info">
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
