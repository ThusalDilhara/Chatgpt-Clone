import React from 'react'
import ShinyText from './shinyText';



const navbar = ({isOpen}) => {
  return (
    <>
      <div className='flex justify-between items-center bg-[#282828] p-4 h-[57px] w-full fixed z-10 border-b border-[#303030]'>
      <div className={`flex font-bold text-xl transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-20'}`}>
          <ShinyText text="ChatGPT" disabled={false} speed={5} className='custom-class' />
        </div>

      </div>
    </>
  )
}

export default navbar;