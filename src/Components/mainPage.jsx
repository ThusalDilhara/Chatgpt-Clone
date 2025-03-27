import { useContext } from 'react';
import { Send } from 'lucide-react';
import { Context } from '../context/context';

const MainPage = () => {
  const { input, setInput, onsent, chatHistory } = useContext(Context);

  return (
    <div className="flex h-screen bg-[#282828] w-full pt-[58px]">
      <div className="flex-1 flex flex-col relative">
        {/* Chat Display */}
        <div className="absolute top-0 bottom-[120px] left-[200px] right-0 overflow-y-auto space-y-4 text-white">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mr-40 p-3 rounded-2xl ${
                chat.sender === 'user'
                  ? 'bg-[#3c3c3c] max-w-xl ml-auto ' // User message (on the right with margin)
                  : 'bg-transparent' // Response (full width)
              }`}
            >
              <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
            </div>
          ))}
        </div>

        {/* Input Box (Fixed at Bottom) */}
        <div className="absolute bottom-8 left-[200px] right-[160px] pb-10 border rounded-2xl border-gray-600 flex items-center z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 p-3 bg-transparent text-white outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onsent()}
          />
          <button
            onClick={onsent}
            className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg"
          >
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
