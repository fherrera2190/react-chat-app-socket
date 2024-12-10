import { createContext } from "react";
import { ChatState } from "./ChatProvider";
import { ActionChat } from "./chatReducer";


interface ChatContextType {
    chatState: ChatState;
    dispatch: (React.Dispatch<ActionChat>);
    messageDiv: React.RefObject<HTMLDivElement>;
    bottomScroll: () => void
}

const ChatContext = createContext({} as ChatContextType);

export default ChatContext;