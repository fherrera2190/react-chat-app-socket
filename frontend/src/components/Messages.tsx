import { IncomingMessage, OutgoingMessage, SendMessage } from "./";

export const Messages = () => {
  const msgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="mesgs">
      <div className="msg_history">
        {msgs.map((msg) =>
          msg % 2 ? (
            <OutgoingMessage key={msg} />
          ) : (
            <IncomingMessage key={msg} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};
