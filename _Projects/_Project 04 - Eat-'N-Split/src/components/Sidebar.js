import { useState } from "react";
import { FormAddFriend } from "./FormAddFriend";
import { FriendList } from "./FriendList";

export function Sidebar({ friends, selectedFriendId, onSelectFriend, onAddFriend }) {
  const [formOpened, setFormOpened] = useState(false);

  return (
    <section className="sidebar">
      <FriendList friends={friends} selectedFriendId={selectedFriendId} onSelectFriend={onSelectFriend} />
      {formOpened && <FormAddFriend onAddFriend={onAddFriend} setFormOpened={setFormOpened} />}
      <button className="button" onClick={() => setFormOpened(opened => !opened)}>
        {formOpened ? "Close" : "Add friend"}
      </button>
    </section>
  );
}
