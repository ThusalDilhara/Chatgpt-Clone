import { useState } from 'react'
import SideBar from './Components/sideBar'  
import MainPage from './Components/mainPage'
import Navbar from './Components/navbar'
import SignIn from './Components/signIn'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <div className='flex'>
                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                <Navbar isOpen={isOpen} />
                <MainPage />
              </div>
            }
          />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
