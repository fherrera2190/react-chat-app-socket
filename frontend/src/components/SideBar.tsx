import { useContext } from "react";
import { SideBarChatItem } from "./";
import ChatContext from "../context/chat/ChatContex";
import AuthContext from "../auth/AuthContext";

export const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.users.map((user) => {
        if (user.uid !== auth.uid)
          return <SideBarChatItem key={user.uid} user={user} />;
      })}
      <div className="extra_space"></div>
    </div>
  );
};
