import { useState } from 'react';
import Sidebar from './sideBar';
import { Send } from 'lucide-react';

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Simulate ChatGPT response (replace with API call)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm here to help!", sender: 'bot' }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="flex h-screen bg-[#282828]  w-full">
     

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-600 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 p-3 bg-transparent text-white outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="p-3 hover:bg-gray-700 rounded-lg">
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;