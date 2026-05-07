export function PackingListActions({ onClearList, setSortBy }) {
  return (
    <div className="actions">
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={onClearList}>Clear List</button>
    </div>
  );
}
