import { ReactNode, useCallback, useReducer, useRef } from "react";
import { chatReducer } from "./chatReducer";
import ChatContext from "./ChatContex";
import { Message, User } from "../../interfaces";

interface Props {
  children: ReactNode;
}

export interface ChatState {
  uid?: string;
  chatActive?: string;
  users: User[];
  messages: Message[];
}

const initialState: ChatState = {
  users: [],
  messages: [],
};

export const ChatProvider = ({ children }: Props) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);
  const messageDiv = useRef<HTMLDivElement>(null);

  const bottomScroll = useCallback(() => {
    if (messageDiv.current) {
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ chatState, dispatch, messageDiv, bottomScroll }}
    >
      {children}
    </ChatContext.Provider>
  );
};
