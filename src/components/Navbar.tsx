'use client'
import React from 'react'
import { ThemeToggle } from './ThemeToggle'

const Navbar = () => {
  return (
   <header className='bg-card  shadow-sm sticky top-0  flex justify-between px-10 py-5'>
      <div>
        search and icon
        
      </div>
      <div>
        options
        <ThemeToggle/>
      </div>
      <div>
         profile and notificationns
      </div>
   </header>
  )
}

export default Navbar