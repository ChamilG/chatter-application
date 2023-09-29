import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import {  doc, onSnapshot } from "firebase/firestore";
import {auth, db } from '../Firebase/firebase';
export default function Messages() {
  
  const[messages,setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
      // console.log(doc.data())
    });
    return ()=>{
      // clear up the memory
      unsub();
    };

  },[data.chatId])

  return (
    <div className='messages'>
     { messages.map((message)=>
       <Message message={message} key={message.id}/>
      )}
    </div>
  )
}
