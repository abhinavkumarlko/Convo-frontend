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

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [messageList, setMessageList] = useState([
    // { text : 'Kal kon sa exam hai?', sent: true },
    // { text : 'Kal hi pata krenge!!', sent: false },
    // { text : 'ok Bye BYe!!', sent: true },
    // { text : 'ok Good Night!!', sent: false },
  ]);

  const addOnline = () => {
    console.log(currentUser);
    socket.emit("setonline", currentUser._id);
  };

  useEffect(() => {
    socket.connect();
    console.log(currentUser);
    addOnline();

    socket.on("recmsg", (data) => {
      setMessageList([...messageList, data]);
    });

    socket.on("usersonline", (data) => {
      console.log(data);
      // setOnlineUsers(data);
    });
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
        <div className="row">
          <div className="col-md-4 scroll">
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
            <section>
              <h5>Abhinav</h5>
              <p>{text}</p>
            </section>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="chat-area">{displayMessages()}</div>
              </div>
              <div className="card-footer">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
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
      </div>
    </div>
  );
};

export default Chat;
