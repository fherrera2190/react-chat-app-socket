import { Message, User } from "../../interfaces";
import { ChatState } from "./ChatProvider";

export enum ActionChatType {
  loadedUsers = "[Chat] Loaded Users",
  activeChat = "[Chat] Active Chat",
  newMessage = "[Chat] New Message",
  loadMessages = "[Chat] Load Messages",
  clearMessages = "[Chat] Clear Messages",
}

export type ActionChat =
  | { type: ActionChatType.loadedUsers; payload: User[] }
  | { type: ActionChatType.activeChat; payload: string }
  | { type: ActionChatType.newMessage; payload: Message }
  | { type: ActionChatType.loadMessages; payload: Message[] }
  | { type: ActionChatType.clearMessages };

export const chatReducer = (state: ChatState, action: ActionChat) => {
  switch (action.type) {
    case ActionChatType.loadedUsers:
      return { ...state, users: [...action.payload] };

    case ActionChatType.activeChat:
      if (state.chatActive === action.payload) return state;
      return { ...state, messages: [], chatActive: action.payload };

    case ActionChatType.newMessage:
      if (
        state.chatActive === action.payload.from ||
        state.chatActive === action.payload.to
      ) {
        return { ...state, messages: [...state.messages, action.payload] };
      } else {
        return state;
      }

    case ActionChatType.loadMessages:
      return { ...state, messages: [...action.payload] };

    case ActionChatType.clearMessages:
      return { messages: [], users: [] };
    default:
      return state;
  }
};
