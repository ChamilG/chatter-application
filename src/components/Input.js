import { useState } from "react"
// import {GrAttachment} from 'react-icons/gr'
// import {BsCardImage} from 'react-icons/bs'

export default function Input(props) {
  const[current]
  const[text, setText] = useState(null);
  
  const handleSend = () => {

  }

  return (
    <div className='input-container'>
      <input className='input-field' type='text' placeholder='type...'/>
      <div className='send'>
        {/* <GrAttachment className='icons'/> */}
        <input  type='file' style={{display:"none"}} id='file'/>

        <label htmlFor='file'>
            {/* <BsCardImage className='icons'/> */}
        </label>
        <button className='send-btn'>Send</button>
      </div>
    </div>
  )
}
