import React from 'react'
import './header.css'
import { Nav } from './nav'

export const Header = () => {


  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#335c67]/35 bg-[#e5eeea]/95 shadow-sm shadow-[#0f4c5c]/10 backdrop-blur-md">
      <Nav/>
    </header>
  )
}
