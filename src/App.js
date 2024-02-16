import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gotImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';


function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
    text: "Hi Iam ChatGPT, an AI Helper for You",
    isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  
  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: res, isBot: true }
    ]);
  };
  

  const handleEnter = async (e) => {
    if(e.key ==='Enter') await handleSend();
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot:false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text: input, isBot: false},
      {text: res, isBot: true} 
    ]);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGpt</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="query" />What is Programming?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="query" />How to use an API?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listitemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="" className="listitemsImg" />Upgrade to pro</div>

        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="chat">
            <img className="chatimg" src={userIcon} alt="" /><p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, necessitatibus.</p>
          </div>
          <div className="chat bot">
            <img className="chatimg" src={gotImgLogo} alt="" /><p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur dolor officia, libero unde cupiditate quia ex voluptates inventore minus dolore eius odit saepe quasi qui omnis aliquam? Reiciendis, ex consectetur. A modi aliquid commodi dolores? Quia sint veritatis sequi eaque explicabo in id tempora, natus repellendus laboriosam ea quam similique repellat, praesentium eos rem odio facere mollitia culpa voluptates aut. Porro eos tempore vel expedita ipsum voluptatem dicta? Magnam non magni commodi nisi quibusdam tempore natus laborum aspernatur sed minus veritatis quasi ad unde exercitationem doloribus accusamus culpa in, molestias fugit. Blanditiis vitae ipsam, dolorum ut assumenda eos in quod.</p>
          </div>
          {messages.map((message, i) => (
  <div className={message.isBot ? "chat bot" : "chat"} key={i}>
    <img className="chatimg" src={message.isBot ? gotImgLogo : userIcon} alt="" />
    <p className="text">{message.text}</p>
  </div>
))}
<div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="send a message" value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
          <p>ChatGPT may produce incorrect information about places, people or facts.ChatGPT January 22 Version.</p>
        </div>

      </div>
    </div>
  );
}

export default App;
