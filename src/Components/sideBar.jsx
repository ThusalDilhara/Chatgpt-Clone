import { useContext, useState } from 'react';
import {
  Menu,
  Plus,
  MessageCircle,
  LogOut,
  Trash2,
} from 'lucide-react';
import mainlogo from '../assets/chatgpt2.png';
import { account } from '../config/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../context/context';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { newChat, loadChat, recentChats, deleteChat } = useContext(ChatContext);
   console.log(useContext(ChatContext));

  const logout = async () => {
    try {
      await account.deleteSessions();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div
     className={`fixed top-0 left-0 h-screen text-white z-30 transition-all duration-300 ease-in-out
      ${isOpen ? 'w-64 bg-[#1a1a1a]' : 'w-12'}
      ${!isOpen ? 'bg-transparent' : ''}
      md:relative md:flex md:bg-[#1a1a1a]`}
    >

    
      <div className="flex flex-col h-full">
        {/* Top Section */}
        <div className="flex items-center justify-between p-3 pb-5 border-b border-[#333]">
          {isOpen && <div className="flex items-center gap-2">
            <img src={mainlogo} alt="logo" className="w-6 h-6" />
            <h1 className="text-[16px] font-semibold">ChatGPT</h1>
          </div>}
          {/* Always show Menu icon */}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {/* New Chat */}
        {isOpen && <button
          onClick={newChat}
          className="flex items-center gap-3 p-3 hover:bg-[#3c3c3c]"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </button>}

        {/* Recent Chats */}
        { isOpen && 
        <div className="flex-1 overflow-y-auto">
          {recentChats.map((chat, index) => (
            <div
              key={index}
              className="p-3 flex items-center gap-3 hover:bg-[#3c3c3c] cursor-pointer text-sm"
              onClick={() => loadChat(chat.$id)}
            >
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-colors duration-300"
              >
                {hoveredIndex === index ? (
                  <Trash2
                    size={20}
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.$id);
                    }}
                  />
                ) : (
                  <MessageCircle size={20} />
                )}
              </div>
              {isOpen && <span className="truncate">{chat.title}</span>}
            </div>
          ))}
        </div>}

        {/* Logout */}
        {isOpen && <button
          onClick={logout}
          className="flex items-center gap-3 p-3 hover:bg-[#3c3c3c] border-t border-[#333]"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>}
      </div>
   </div> 
  );
};

export default Sidebar;
