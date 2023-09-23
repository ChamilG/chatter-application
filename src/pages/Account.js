import React from 'react'
import Chat from '../components/Chat'
import Search from '../components/Search';
import SideBar from '../components/SideBar';

export default function Account() {
  return (
    <div className='account'>
      <div className='container'>
      <SideBar/>
      <Chat/>
      </div>
    </div>
  )
}
