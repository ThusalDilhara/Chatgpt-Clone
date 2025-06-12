import { useContext,useEffect,useRef } from 'react';
import { Send,CircleStop } from 'lucide-react';
import { Context } from '../context/context';

// h
const MainPage = () => {
  const { input, setInput, onsent, chatHistory,loading,showResults} = useContext(Context);
  const messageEndRef = useRef(null);

  const scrollToBottom =()=>{
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(()=>{
    scrollToBottom();
  },[loading,showResults]);

  return (
    <>
    {!showResults?
      <div className="flex h-screen bg-[#282828] w-full pt-[58px] relative items-center justify-center pb-60">
         <h1 className='text-4xl text-white font-semibold'>What Can I Help With?</h1>

         <div className="absolute bottom-60 left-[200px] right-[160px] pb-10 border rounded-2xl border-gray-600 flex items-center z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 p-3 bg-transparent text-white outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onsent()}
          />
          {loading ?(<button
          
            className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg"
          ><CircleStop size={26}/></button>):(<button
            onClick={onsent}
            className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg"
          >
           <Send size={24} />
          </button>)}
        </div>

        <p className="text-white text-xs text-center absolute bottom-0 left-0 right-0">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
      
      
    :<div className="flex h-screen bg-[#282828] w-full pt-[58px]">
      <div className="flex-1 flex flex-col relative">
        {/* Chat Display */}
        <div className="absolute top-0 bottom-[120px] left-[200px] right-0 overflow-y-auto space-y-4 text-white">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mr-40 p-3 rounded-2xl ${
                chat.sender === 'user'
                  ? 'bg-[#3c3c3c] max-w-xl ml-auto '
                  : 'bg-transparent'
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

        {/* Input Box (Fixed at Bottom) */}
        <div className="absolute bottom-8 left-[200px] right-[160px] pb-10 border rounded-2xl border-gray-600 flex items-center z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            disabled={loading}
            className="flex-1 p-3 bg-transparent text-white outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onsent()}
          />
          {loading ?(<button
          
            className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg"
          ><CircleStop size={24}/></button>):(<button
            onClick={onsent}
            className="p-3 text-white hover:bg-[#3c3c3c] rounded-lg"
          >
           <Send size={24} />
          </button>)}
        </div>

        <p className="text-white text-xs text-center absolute bottom-0 left-0 right-0">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>}
    </>
  );
};

export default MainPage;
