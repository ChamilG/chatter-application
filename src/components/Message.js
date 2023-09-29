import React, { useContext, useRef, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext';
import {auth, db } from '../Firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Message({message}) {

  const [currentUser] = useAuthState(auth);
  const{data} = useContext(ChatContext)
  
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && ' owner'}`}>
      <img src= {message.senderId === currentUser.uid?currentUser.photoURL:data.user.photoURL} alt="userprofilepic" className='message-image'/>
      <p>{message.text}</p>
  </div>
  )
}
