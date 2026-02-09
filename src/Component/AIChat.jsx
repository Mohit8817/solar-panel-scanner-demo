// src/Component/AIChat.jsx
import React, { useState, useEffect, useRef } from "react";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    const userMessage = message;
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setChat([...newChat, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setChat([
        ...newChat,
        { sender: "bot", text: "❌ Server not responding. Please check backend." }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{background:'#f8fafc',padding:20,display:'flex',justifyContent:'center'}}>
      <div style={{width:"100%",maxWidth:"700px",borderRadius:16,background:"#fff",boxShadow:"0 10px 40px rgba(0,0,0,0.1)"}}>

        {/* Header */}
        <div style={{background:"#6366f1",padding:20,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,background:"white",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",fontSize:24}}>🤖</div>
          <div style={{color:"#fff"}}>
            <h2 style={{margin:0,fontSize:18}}>AI Assistant</h2>
            <p style={{margin:0,fontSize:14,opacity:.8}}>Online • Ready to Help</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{height:"450px",overflowY:"auto",padding:20}}>
          {chat.map((msg, i) => (
            <div key={i} style={{display:"flex",justifyContent:msg.sender === "user" ? "flex-end" : "flex-start",marginBottom:10}}>
              <div style={{
                padding:"10px 14px",
                borderRadius:12,
                maxWidth:"75%",
                background:msg.sender === "user" ? "#3b82f6" : "#fff",
                color:msg.sender === "user" ? "#fff" : "#111",
                border:msg.sender === "user" ? "none" : "1px solid #ddd"
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div style={{padding:16,display:"flex",gap:10,borderTop:"1px solid #ddd"}}>
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid #ddd"}}
          />
          <button onClick={sendMessage} style={{padding:"12px 20px",background:"#6366f1",color:"#fff",border:"none",borderRadius:12}}>
            Send ➤
          </button>
        </div>

      </div>
    </div>
  );
};

export default AIChat;
