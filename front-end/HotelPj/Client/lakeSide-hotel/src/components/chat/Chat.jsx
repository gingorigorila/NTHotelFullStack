/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { inputIntents, model } from "../../training-data/training";

const Chat = ({ setActive }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("");
  useEffect(() => {
    setTimeout(() => processInput("hello"), 1000);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((messages) => [{ author: "user", text: input }, ...messages]);
    setTimeout(() => processInput(input), 1000);
    setInput("");
  };
  function nomrmalizedString(input) {
    return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  }
  const generatedResponse = (intent) => {
    if (model.responses && model.responses[intent]) {
      const responses = model.responses[intent];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex].answer;
    }
    return "Bạn có thể mô tả lại không?";
  };
  const proceedResponse = () => {
    switch (selectedIntent) {
      case "orderTracking":
        return "Your order have been delivered";
      case "shippingInformation":
        return "Your order have been shipped. it will be delivered in 3 days";
      case "cancelOrder":
        return "Your order have been canceled successfully";
      case "feedbackSubmission":
        return "Your feedback have been submitted successfully";
      default:
        return "I can't able to process your response";
    }
  };
  const queriesAnswered = () => {
    setTimeout(() => {
      setMessages((messages) => [
        { author: "bot", text: "Say hi to restart your chat" },
        { author: "bot", text: "Thank you for using our bot" },
        {
          author: "bot",
          text: "Feel free to ping me if you have any other queries",
        },
        {
          author: "bot",
          text: "I hope your query have been resolved",
        },
        ...messages,
      ]);
      setTimeout(() => setActive(false), 5000);
    }, 2000);
  };
  

  const processInput = (input) => {
    const nomrmalizeString = nomrmalizedString(input).toLowerCase();
    if (selectedIntent) {
      const response = proceedResponse();
      setMessages((messages) => [
        { author: "bot", text: response },
        ...messages,
      ]);
      setSelectedIntent("");
      queriesAnswered();
      return "";
    }
    const intent = matchIntent(nomrmalizeString);
    const response = generatedResponse(intent);
    setMessages((messages) => [{ author: "bot", text: response }, ...messages]);
    if (inputIntents.includes(intent)) {
      setSelectedIntent(intent);
    }
    if (intent === "bye") {
      queriesAnswered();
    }
  };
  const arrayIncludesString = (arr, string) => {
    for (let word of arr) {
      if (!string.includes(word)) {
        return false;
      }
    }
    return true;
  };
  const matchIntent = (input) => {
    if (model.intents) {
      for (const [intent, patterns] of Object.entries(model.intents)) {
        for (const pattern of patterns) {
          const array = pattern.split("");
          if (arrayIncludesString(array, input)) {
            return intent;
          }
        }
      }
    }
  };

  return (
    <div class="chatbot">
     <div class="chatbot-header">Nha Trang Hotel xin chào
        <button className="close-button" onClick={() => setActive(false)}>
          Đóng
        </button>
     </div>
     <div class="messages">
       {messages.map((message, index) => (
        <div key={message.text + index} className={`message ${message.author}`}>
          {message.author === 'bot' && <img src="../src/assets/img/chatbot.png" alt="" />}
          {message.author === 'user' && <img src="../src/assets/img/user.png" alt="" />}
          <div className="message-text">{message.text}
        </div>
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
