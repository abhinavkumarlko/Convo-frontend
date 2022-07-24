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

  const [contactId, setContactId] = useState("");

  const addContact = async () => {
    const response = await fetch(url + "/user/pushupdate/" + currentUser._id, {
      method: "PUT",
      body: JSON.stringify({ contacts: contactId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    if (response.status == 200) {
      response.json().then((data) => {
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
      });
    }
  };

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
    if (currentUser !== null) addOnline();

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
    <div className="h-100 mt-5 pt-2 bg-">
      <div className="container-fluid pt-5">
        <h1>{currentUser._id}</h1>
        <h1>{currentUser.name}</h1>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContactId(e.target.value)}
          />
          <button onClick={addContact} className="btn btn-primary">
            Add Contact
          </button>
        </div>
        <div className="row">
          <div className="col-4 scroll">
            {currentUser.contacts.map(({ name, email }) => (
              <div className="user">
                <h5>{name}</h5>
                <p>{email}</p>
                <p className="text-view">{text}</p>
              </div>
            ))}
          </div>
          <div className="col-8">
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
