import { useState } from 'react'
import '../styles/Ai.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Your personal AI! Ask me anything!",
      // sentTime: "just now",
      sender: "model"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages,newMessage);
  };

  async function processMessageToChatGPT(chatMessages,newMessage) {


    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "AI") {
        role = "model";
      } else {
        role = "user";
      }
      return { role: role, parts: messageObject.message}
    });


    await fetch("http://localhost:3001/chat", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"prompt": newMessage})
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log("data",data);
      setMessages([...chatMessages, {
        message: data.text,
        sender: "Ai"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <>
       <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-start">
            <Nav.Link as={Link} to="/studentdash">Home</Nav.Link>
            <Nav.Link as={Link} to="/coursespage">All Courses</Nav.Link>
            <Nav.Link as={Link} to="/assignments">Assignments</Nav.Link>
            <Nav.Link as={Link} to="/AI">AI</Nav.Link>
            <Nav.Link as={Link} to="">Report</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <div className="App-ai">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Padh-AI is typing" /> : null}
              >
              {messages.map((message, i) => {
                  return <Message key={i} model={message} />
                })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
                </>
  )
}

export default App
