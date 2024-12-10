import { useContext } from "react";
import { GetMessagesResponse, User } from "../interfaces";
import ChatContext from "../context/chat/ChatContex";
import { ActionChatType } from "../context";
import { fetchWithToken } from "../helpers";

interface Props {
  user: User;
}

export const SideBarChatItem = ({ user }: Props) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const onClick = async () => {
    dispatch({
      type: ActionChatType.activeChat,
      payload: user.uid,
    });

    const resp = await fetchWithToken<GetMessagesResponse>(
      `api/messages/${user.uid}`
    );
    dispatch({ type: ActionChatType.loadMessages, payload: resp.last30 });

  };

  return (
    <div
      className={`chat_list ${
        chatState.chatActive === user.uid && "active_chat"
      }`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>

          {user.onLine ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
