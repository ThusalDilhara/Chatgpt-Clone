import { useState } from 'react';
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
    <div className="flex h-screen bg-[#282828] w-full pt-[58px]">
  <div className="flex-1 flex flex-col relative">
    {/* Chat Display */}
    <div
      className="absolute top-0 bottom-[120px] left-[200px] right-0 overflow-y-auto space-y-4 text-white"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#3c3c3c] ml-auto mr-40' : 'bg-transparent'}`}
        >
          {msg.text}
        </div>
      ))}
    </div>

    {/* Input Box (Fixed at Bottom) */}
    <div className="absolute bottom-8 left-[200px] right-[160px]  pb-10 border rounded-2xl border-gray-600 flex items-center z-10">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything"
        className="flex-1 p-3 bg-transparent text-white outline-none"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg">
        <Send size={24} />
      </button>
    </div>

    <p className="text-white text-xs text-center absolute bottom-0 left-0 right-0">
      ChatGPT can make mistakes. Check important info.
    </p>
  </div>
</div>


  );
};

export default MainPage;