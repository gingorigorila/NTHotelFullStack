/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { inputIntents, model } from "../../training-data/training";
import { getMessages } from "../ultils/ApiFunctions";

const Chat = ({ setActive }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // setTimeout(() => processInput("hello"), 1000);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages((messages) => [
      { author: "user", text: input },
      ...messages,
    ]);
    console.log("messages", input);
    processInput(input);
    setInput("");
  };



  const processInput = async (input) => {
    fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: input }),
    })
      .then((response) => response.json())
      .then((data) =>setMessages((messages) => [{ author: "bot", text: data.answer }, ...messages]))
      .catch((error) => console.error("Error:", error));

    // setMessages((messages) => [{ author: "bot", text: response }, ...messages]);
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">Nha Trang Hotel xin chào
          <button className="close-button" onClick={() => setActive(false)}>
            Đóng
          </button>
      </div>

      <div className="messages">
       {messages.map((message, index) => (
          <div key={message.text + index} className={`message ${message.author}`}>
            {message.author === 'bot' && <img src="../src/assets/img/chatbot.png" alt="" />}
            {message.author === 'user' && <img src="../src/assets/img/user.png" alt="" />}
            <div className="message-text">{message.text}</div>
          </div>
       ))}

    </div>

  <form id="form1" onSubmit={handleSubmit}>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Nhập câu hỏi..."
      wrap="soft"
    />
    <button type="submit" disabled={input.length === 0}>
      Gửi
    </button>
  </form>
</div>
  );
};
export default Chat;
