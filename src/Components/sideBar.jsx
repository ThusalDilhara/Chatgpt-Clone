import { useState } from 'react';
import { Menu, Plus, MessageCircle, LogOut } from 'lucide-react';
import mainlogo from '../assets/chatgpt2.png';

const sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen ${isOpen ? 'w-64' : 'w-20'} bg-[#141414] text-white flex flex-col transition-all duration-300 z-20`}>
      
      <div className="flex items-center  p-3 border-b border-gray-700">
        {isOpen&&<img src={mainlogo} alt="logo" className='size-8'/>}
        <h1 className={`text-[16px] ml-1 font-semibold ${!isOpen && 'hidden'}`}>ChatGPT</h1>
        <button className={`${isOpen && 'ml-10'}`} onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      
      <button className="flex items-center gap-3 p-3 hover:bg-gray-700">
        <Plus size={20} />
        {isOpen && <span>New Chat</span>}
      </button>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 flex items-center gap-3 hover:bg-gray-700 cursor-pointer">
          <MessageCircle size={20} />
          {isOpen && <span>Recent Chat</span>}
        </div>
      </div>

     
      <button className="flex items-center gap-3 p-3 hover:bg-gray-700">
        <LogOut size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default sidebar;
