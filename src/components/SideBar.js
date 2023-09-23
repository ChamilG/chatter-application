import React from 'react'
import SideChats from './SideChats'
import Search from './Search'
export default function SideBar() {
  return (
    <div className='sidebar'>
      <Search/>
      <SideChats/>
    </div>
  )
}
