import { useState } from "react";
import { PackingListActions } from "./PackingListActions";
import { PackingListItem } from "./PackingListItem";

export function PackingList({ items, onCheckItem, onDeleteItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul className="packing-list">
        {sortedItems.map(item => (
          <PackingListItem key={item.id} item={item} onCheckItem={onCheckItem} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
      <PackingListActions onClearList={onClearList} setSortBy={setSortBy} />
    </div>
  );
}
