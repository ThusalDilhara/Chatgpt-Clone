import { useState } from 'react'
import SideBar from './Components/sideBar'  
import MainPage from './Components/mainPage'
import Navbar from './Components/navbar'

function App() {
  
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
    <div className='flex'>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen}/>
      <MainPage />
      </div>
    </>
  )
}

export default App
