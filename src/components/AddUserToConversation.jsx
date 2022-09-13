import { useState } from "react";

function AddUserToConversation({ handleClick, partner }) {
  const [message, setMessage] = useState(null);
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  }
  return (
    <div className="addUserToConversationContainer">
      <div className="addUserToConversationTextBox">
        <div className="addUserToConversationContent">
          <textarea onChange={handleChangeMessage} maxLength={255} placeholder="Nhập lời chào" />
        </div>
      </div>
      <button
        onClick={handleClick(message, partner)}
        className="addUserToConversationButton"
      >
        Gửi tin nhắn
      </button>
    </div>
  );
}
export default AddUserToConversation;
