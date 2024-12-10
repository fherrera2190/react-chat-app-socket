import { hourMonth } from "../helpers";
import { Message } from "../interfaces";

interface Props {
  message: Message;
}

export const OutgoingMessage = ({ message }: Props) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date">{hourMonth(message.createdAt)}</span>
      </div>
    </div>
  );
};
