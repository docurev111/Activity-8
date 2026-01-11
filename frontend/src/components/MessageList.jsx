import { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages, currentUsername }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">No messages yet. Start the conversation!</div>
      ) : (
        messages.map((message, index) => {
          const isOwnMessage = message.username === currentUsername;
          return (
            <div
              key={message.id || index}
              className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
            >
              <div className="message-content">
                <div className="message-sender">
                  <span className="message-sender-name">{isOwnMessage ? 'You' : message.username}</span>
                  <span className="message-time">{formatTime(message.createdAt)}</span>
                </div>
                <div className="message-text">{message.content}</div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
