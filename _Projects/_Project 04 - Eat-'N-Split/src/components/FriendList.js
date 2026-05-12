import { Friend } from "./Friend";

export function FriendList({ friends, selectedFriendId, onSelectFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend key={friend.id} friend={friend} selected={friend.id === selectedFriendId} onSelect={() => onSelectFriend(friend.id)} />
      ))}
    </ul>
  );
}
