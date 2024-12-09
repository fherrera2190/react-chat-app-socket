import { ChatSelect, InboxPeople, Messages } from "../components";

import "../css/chat.css";

export const ChatPage = () => {
  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {true ? <ChatSelect /> : <Messages />}
      </div>
    </div>
  );
};
