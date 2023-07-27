import React from 'react'
import "./Display.css"
import Navbar from './Navbar/Navbar'
import Event from './Events/Event'
const Display = () => {
  return (
    <div className='Display'>
        <Navbar />
        <Event />
    </div>
  )
}

export default Display