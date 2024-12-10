import { hourMonth } from "../helpers";
import { Message } from "../interfaces";

interface Props {
  message: Message;
}

export const IncomingMessage = ({ message }: Props) => {

  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message.message}</p>
          <span className="time_date">{hourMonth(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
