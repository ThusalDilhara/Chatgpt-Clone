import React, { useEffect, useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import ShinyText from './shinyText';
import { account } from '../config/appwriteConfig';

const Navbar = ({ isOpen }) => {

  const [userInitial,setUserInital]=useState("");


  useEffect(()=>{
     const getUser=async()=>{
        
      try{
        const user= account.get();

        if((await user).name){
          const username= (await user).name.slice(0,2).toUpperCase();
          setUserInital(username);
        }

      }catch(error){
         console.log("Error fetching user data:", error);
         
      }
     };
      getUser();
  },[]);
  return (
    <>
      <div className='flex justify-between items-center bg-[#282828] p-4 h-[57px] w-full fixed z-10 border-b border-[#303030]'>
        
        <div className={`flex font-bold text-xl transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-20'}`}>
          <ShinyText text="ChatGPT" disabled={false} speed={5} className='custom-class' />
        </div>

        {userInitial?
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-400  text-white text-sm font-light hover:border border-white ">
          {userInitial}
        </div>
        
        :<div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <UserCircle2 size={32} strokeWidth={1.5} className="text-[#B5B5B5] hover:text-[#929292]" />
          
        </div>}

      </div>
    </>
  );
};

export default Navbar;
