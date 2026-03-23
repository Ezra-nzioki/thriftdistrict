import React from 'react'
import './header.css'
import { Nav } from './nav'

export const Header = () => {


  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-md z-40">
      <Nav/>
    </header>
  )
}
