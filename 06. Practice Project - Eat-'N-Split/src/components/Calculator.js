import { useState } from "react";
import { FormSplitBill } from "./FormSplitBill";
import { Sidebar } from "./Sidebar";
import { initialFriends } from "../data";

export function Calculator() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  function handleSplitBill(friendId, friendNewOwe) {
    setFriends(friends => friends.map(friend => (friend.id === friendId ? { ...friend, balance: friend.balance + friendNewOwe } : friend)));
  }

  function handleSelectFriend(friendId) {
    setSelectedFriendId(current => (current === friendId ? null : friendId));
  }

  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend]);
  }

  return (
    <>
      <Sidebar friends={friends} selectedFriendId={selectedFriendId} onSelectFriend={handleSelectFriend} onAddFriend={handleAddFriend} />
      {selectedFriendId && (
        <FormSplitBill friendId={selectedFriendId} friendName={friends.find(f => f.id === selectedFriendId)?.name} onSubmit={handleSplitBill} setSelectedFriendId={setSelectedFriendId} />
      )}
    </>
  );
}
