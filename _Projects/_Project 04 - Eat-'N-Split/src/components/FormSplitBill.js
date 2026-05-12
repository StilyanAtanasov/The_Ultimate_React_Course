import { useState } from "react";

export function FormSplitBill({ friendId, friendName, onSubmit, setSelectedFriendId }) {
  const [billValue, setBillValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [payer, setPayer] = useState("user");

  const paidByFriend = billValue ? billValue - userExpense : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!billValue || !userExpense) return;
    if (paidByFriend < 0 || userExpense < 0 || billValue < 0) return;

    const balanceChange = payer === "user" ? paidByFriend : -userExpense;

    onSubmit(friendId, balanceChange);
    setBillValue("");
    setUserExpense("");
    setPayer("user");
    setSelectedFriendId(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friendName}</h2>

      <label>💰 Bill value</label>
      <input name="billValue" type="number" value={billValue} onChange={e => setBillValue(Number(e.target.value))} />

      <label>🧍‍♀️ Your expense</label>
      <input
        name="userExpense"
        type="number"
        value={userExpense}
        onChange={e => {
          const value = Number(e.target.value);
          value > billValue ? setUserExpense(billValue) : setUserExpense(value);
        }}
      />

      <label>👫 {friendName}'s expense</label>
      <input name="friendExpense" type="number" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill?</label>
      <select name="payer" id="payer" value={payer} onChange={e => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friendName}</option>
      </select>

      <button type="submit" className="button">
        Split bill
      </button>
    </form>
  );
}
