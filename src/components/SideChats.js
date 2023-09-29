import { useState, useEffect, useContext } from 'react'
import { ChatContext } from "../context/ChatContext";
import {auth, db } from '../Firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {  doc, onSnapshot } from "firebase/firestore";


export default function SideChats() {
  const[currentUser] = useAuthState(auth)
  const[chats,setChats] = useState([])
  const { dispatch } = useContext(ChatContext);

  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc)=>{
        setChats(doc.data());
        // console.log(doc.data())
      });
      return ()=>{
        // clear up the memory
        unsub();
      };
    }
    if (currentUser.uid) {
      getChats()
    } 
  },[currentUser.uid])
// console.log(chats.chats)
  // Object.entries(chats.chats)?.map((chat) =>
  //   console.log(chat[1].uid)
  //   )
  
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log(u)
  };
  return (
          <div className='chat'>
          { Object.entries(chats)?.map((chat) =>
            <div key={chat[0]} className='userChat' onClick={()=> handleSelect(chat[1].userInfo)}> 
            <div className='userChatInfo'>
                <img className='user-image' src={chat[1].userInfo.photoURL} 
                alt=""/>
                 <p className='p'><span className='span'>{chat[1].userInfo.displayName}</span><br/> hello</p>
            </div>
            </div>
             )}
          </div>       
  )
}
