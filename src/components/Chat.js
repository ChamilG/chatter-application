import React from 'react'
import Messages from './Messages';
import Input from './Input';
import {auth, db } from '../Firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
// import { BsFillCameraVideoFill } from "react-icons/bs";
// import { BiSolidUserPlus } from "react-icons/bi";
export default function Chat() {
  const { currentUser } = useAuthState(auth);
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{auth.currentUser.displayName}</span>
        <div className='chatIcons'>
            {/* <BsFillCameraVideoFill className='image'/>
            <BiSolidUserPlus className='image'/> */}
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
