import { AddItemForm } from "./AddItemForm";
import { PackingList } from "./PackingList";

export function Main({ items, handleAddItems, handleDeleteItems, handleCheckItems, handleClearList }) {
  return (
    <>
      <AddItemForm onAddItem={handleAddItems} />
      <PackingList items={items} onCheckItem={handleCheckItems} onDeleteItem={handleDeleteItems} onClearList={handleClearList} />
    </>
  );
}
