import React from 'react'

export default function Message(props) {
  return (
    <div className='message'>
      <img src= {props.img} alt="userprofilepic" className='message-image'/>
      <p>{props.message}</p>
    </div>
  )
}
