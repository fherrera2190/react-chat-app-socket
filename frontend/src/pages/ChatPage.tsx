import { useContext } from "react";
import { ChatSelect, InboxPeople, Messages } from "../components";
import ChatContext from "../context/chat/ChatContex";

import "../css/chat.css";

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />
        {chatState.chatActive ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};
