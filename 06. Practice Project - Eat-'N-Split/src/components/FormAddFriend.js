import { useState } from "react";

export function FormAddFriend({ onAddFriend, setFormOpened }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName) return;
    if (!friendImage) setFriendImage("https://i.pravatar.cc/48");

    const id = crypto.randomUUID();
    const newFriend = { id, name: friendName, image: `${friendImage}?u=${id}`, balance: 0 };

    onAddFriend(newFriend);

    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
    setFormOpened(false);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input type="text" value={friendName} onChange={e => setFriendName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type="text" value={friendImage} onChange={e => setFriendImage(e.target.value)} />

      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}
