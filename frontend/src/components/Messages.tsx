import { useContext, useEffect } from "react";
import { IncomingMessage, OutgoingMessage, SendMessage } from "./";
import ChatContext from "../context/chat/ChatContex";
import AuthContext from "../auth/AuthContext";
export const Messages = () => {
  const { chatState, messageDiv, bottomScroll } = useContext(ChatContext);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    bottomScroll();
  }, [chatState, bottomScroll]);

  return (
    <div className="mesgs">
      <div ref={messageDiv} className="msg_history">
        {chatState.messages.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage key={msg._id} message={msg} />
          ) : (
            <OutgoingMessage key={msg._id} message={msg} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};
