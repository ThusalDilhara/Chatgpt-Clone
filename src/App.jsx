import { useState } from 'react'
import SideBar from './Components/sideBar'  
import MainPage from './Components/mainPage'

function App() {
  
  return (
    <>
    <div className='flex'>
      <SideBar />
      <MainPage />
      </div>
    </>
  )
}

export default App
