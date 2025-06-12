import React, { useEffect, useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import ShinyText from './shinyText';
import { account } from '../config/appwriteConfig';

const Navbar = ({ isOpen }) => {
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = account.get();
        if ((await user).name) {
          const username = (await user).name.slice(0, 2).toUpperCase();
          setUserInitial(username);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    getUser();
  }, []);

  return (
    <div className={`fixed top-0 w-full z-10 bg-[#282828] border-b border-[#303030]`}>
      <div className="flex justify-between items-center px-4 py-3 md:h-[57px]">
        {/* Brand */}
        <div
          className={`text-xl font-bold transition-all duration-300 
            ${isOpen ? 'ml-48 md:ml-56' : 'ml-16 md:ml-20'}
          `}
        >
          <h1 className="shiny-text text-white">ChatGPT</h1>
        </div>

        {/* Avatar / User Icon */}
        <div className="flex-shrink-0">
          {userInitial ? (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-400 text-white text-sm font-light hover:border border-white">
              {userInitial}
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <UserCircle2
                size={32}
                strokeWidth={1.5}
                className="text-[#B5B5B5] hover:text-[#929292]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
