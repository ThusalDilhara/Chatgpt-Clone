import { useContext, useState } from 'react';
import { Menu, Plus, MessageCircle, LogOut,Trash2} from 'lucide-react';
import mainlogo from '../assets/chatgpt2.png';
import { account } from '../config/appwriteConfig';
import { useNavigate } from "react-router-dom";
import { Context } from '../context/context';





const sidebar = ({isOpen,setIsOpen}) => {
  
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const {newChat, loadChat, recentChats,deleteChat} =useContext(Context);

  
  const logout = async () => {
    try {
      const session = await account.get();
      
  
      await account.deleteSessions(); 
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <div className={`h-screen ${isOpen ? 'w-64' : 'w-20'} bg-[#1a1a1a] text-white flex flex-col transition-all duration-300 z-20`}>
      
      <div className="flex items-center  p-3 ">
        {isOpen&&<img src={mainlogo} alt="logo" className='size-8'/>}
        <h1 className={`text-[16px] ml-1 font-semibold ${!isOpen && 'hidden'}`}>ChatGPT</h1>
        <button className={`${isOpen && 'ml-10'}`} onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      
      <button onClick={newChat} className="flex items-center gap-3 p-3 hover:bg-[#3c3c3c]">
        <Plus size={20} />
        {isOpen && <span>New Chat</span>}
      </button>

      <div className="flex-1 overflow-y-auto">
        {recentChats.map((chat,index)=>(

          <div key={index} className="p-3 flex items-center gap-3 hover:bg-[#3c3c3c] cursor-pointer text-sm" onClick={() => loadChat(chat.$id)}>
            <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-colors duration-300">
                {hoveredIndex === index ? (
                  <Trash2 size={20} className='text-red-500' onClick={()=>deleteChat(chat.$id)}/>
                ) : (
                  <MessageCircle size={20} />
                )}
             </div>
          {isOpen && <span>{chat.title}</span>}
         
          </div>
        ))}
          
      
        
      </div>

     
      <button onClick={logout} className="flex items-center gap-3 p-3 hover:bg-[#3c3c3c]">
        <LogOut size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default sidebar;
