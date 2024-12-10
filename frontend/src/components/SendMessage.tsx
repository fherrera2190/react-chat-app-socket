import { ChangeEvent, useContext } from "react";
import { useForm } from "../hooks/";
import SocketContext from "../context/socket/SocketContex";
import AuthContext from "../auth/AuthContext";
import ChatContext from "../context/chat/ChatContex";

const initialFormState = {
  message: "",
};

export const SendMessage = () => {
  const { formState, onInputChange, onResetForm } = useForm(initialFormState);

  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const onClick = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.message.length === 0) return;

    socket.emit("personal-message", {
      from: auth.uid,
      message: formState.message,
      to: chatState.chatActive,
    });
    onResetForm();
  };

  return (
    <form onSubmit={onClick}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            name="message"
            placeholder="Mensaje..."
            onChange={onInputChange}
            value={formState.message}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
