import { useContext, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

// import {GrAttachment} from 'react-icons/gr'
// import {BsCardImage} from 'react-icons/bs'

export default function Input() {

  const [currentUser] = useAuthState(auth);
  const[text, setText] = useState("");

  const{data} = useContext(ChatContext)
  
  
  const handleSend = async () => {
      const text_message = text
      setText("")
      const chatIdRef = await getDoc(doc(db, "chats", data.chatId));  
      if(chatIdRef.exists()){
        console.log("exists")

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text :text_message,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      }
  

  return (
    <div className='input-container'>
      <input 
      className='input-field' 
      type='text' 
      placeholder='type...'
      onChange={(e) => setText(e.target.value)}
      value={text}/>

      {/* <div className='send'> */}
        {/* <GrAttachment className='icons'/> */}
        {/* <input  type='file' style={{display:"none"}} id='file'/> */}

        {/* <label htmlFor='file'> */}
            {/* <BsCardImage className='icons'/> */}
        {/* </label> */}
        <button className='send-btn' onClick={handleSend}>Send</button>
      </div>
    // </div>
  )
}
