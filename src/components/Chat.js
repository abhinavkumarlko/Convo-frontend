import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./chat.css";

const Chat = () => {
  const url = "http://localhost:5000";
  const [socket] = useState(io(url, { autoConnect: false }));
  const [text, setText] = useState("");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [messageList, setMessageList] = useState([
    // { text : 'Kal kon sa exam hai?', sent: true },
    // { text : 'Kal hi pata krenge!!', sent: false },
    // { text : 'ok Bye BYe!!', sent: true },
    // { text : 'ok Good Night!!', sent: false },
  ]);

  useEffect(() => {
    socket.connect();
    console.log(currentUser);
  });

  socket.on("recmsg", (data) => {
    setMessageList([...messageList, data]);
  });

  const sendMessage = () => {
    let obj = { text: text, sent: true };
    socket.emit("sendmsg", obj);
    setMessageList([...messageList, obj]);
  };



  const displayMessages = () => {
    return messageList.map(({ text, sent }) => (
      <div className="msg-body">
        <p className={"msg-text " + (sent ? "msg-sent" : "msg-rec")}>{text}</p>
      </div>
    ));
  };

  return (
    <div className="h-100 mt-5">
      <div className="container pt-5">
        <div className="card">
          <div className="card-body">
            <div className="chat-area">{displayMessages()}</div>
          </div>
          <div className="card-footer">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-describedby="button-addon2"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                class="btn btn-primary"
                onClick={sendMessage}
                type="button"
                id="button-addon2"
                data-mdb-ripple-color="dark"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
