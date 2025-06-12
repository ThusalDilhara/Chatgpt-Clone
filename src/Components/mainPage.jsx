import { useContext, useEffect, useRef } from 'react';
import { Send, CircleStop } from 'lucide-react';
import { ChatContext } from '../context/context';

const MainPage = () => {
  const { input, setInput, onsent, chatHistory, loading, showResults } = useContext(ChatContext);
  console.log(useContext(ChatContext));

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [loading, showResults]);

  return (
    <div className="h-screen bg-[#282828] w-full pt-[58px] flex flex-col">
      {!showResults ? (
        <div className="flex flex-1 items-center justify-center px-4 relative">
          <h1 className="text-2xl md:text-4xl text-white font-semibold text-center">
            What Can I Help With?
          </h1>

          {/* Input */}
          <div className="absolute bottom-40 w-full max-w-4xl mx-auto px-4">
            <div className="flex items-center border rounded-2xl border-gray-600 p-2 bg-transparent">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white outline-none px-3 py-6 text-sm sm:text-base"
                onKeyDown={(e) => e.key === 'Enter' && onsent()}
              />
              <button
                onClick={onsent}
                disabled={loading}
                className="p-2 text-white hover:bg-[#3c3c3c] rounded-lg"
              >
                {loading ? <CircleStop size={24} /> : <Send size={24} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto relative">
          {/* Chat history */}
          <div className="px-4 pt-4 pb-28 max-w-4xl mx-auto space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl text-white text-sm md:text-base ${
                  chat.sender === 'user'
                    ? 'bg-[#3c3c3c] max-w-[90%] ml-auto'
                    : 'bg-transparent max-w-[90%]'
                }`}
              >
                <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
              </div>
            ))}

            {loading && (
              <div className="flex space-x-2 items-center p-3">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div className="fixed bottom-8 w-full px-4">
            <div className="max-w-4xl mx-auto border rounded-2xl border-gray-600 flex items-center bg-transparent p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                disabled={loading}
                className="flex-1 bg-transparent text-white outline-none px-3 py-6 text-sm sm:text-base"
                onKeyDown={(e) => e.key === 'Enter' && onsent()}
              />
              <button
                onClick={onsent}
                disabled={loading}
                className="p-2 text-white hover:bg-[#3c3c3c] rounded-lg"
              >
                {loading ? <CircleStop size={24} /> : <Send size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-white text-xs text-center pb-2">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default MainPage;
