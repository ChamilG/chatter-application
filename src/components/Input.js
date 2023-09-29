import { useState } from "react";
import { auth } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import {GrAttachment} from 'react-icons/gr'
// import {BsCardImage} from 'react-icons/bs'

export default function Input() {

  const [user] = useAuthState(auth);
  const[text, setText] = useState("");
  
  
  const handleSend = () => {
      setText("")    
  }

  return (
    <div className='input-container'>
      <input 
      className='input-field' 
      type='text' 
      placeholder='type...'
      onChange={(e) => setText(e.target.value)}
      value={text}/>

      <div className='send'>
        {/* <GrAttachment className='icons'/> */}
        <input  type='file' style={{display:"none"}} id='file'/>

        <label htmlFor='file'>
            {/* <BsCardImage className='icons'/> */}
        </label>
        <button className='send-btn' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
