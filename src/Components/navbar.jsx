import React from 'react';
import { UserCircle2 } from 'lucide-react';
import ShinyText from './shinyText';

const Navbar = ({ isOpen }) => {
  return (
    <>
      <div className='flex justify-between items-center bg-[#282828] p-4 h-[57px] w-full fixed z-10 border-b border-[#303030]'>
        
        <div className={`flex font-bold text-xl transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-20'}`}>
          <ShinyText text="ChatGPT" disabled={false} speed={5} className='custom-class' />
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <UserCircle2 size={32} strokeWidth={1.5} className="text-[#B5B5B5] hover:text-[#929292]" />
          
        </div>

      </div>
    </>
  );
};

export default Navbar;
