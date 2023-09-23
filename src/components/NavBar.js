import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from './SideBar';

// import ChatBox from '../ChatBox';

export default function NavBar(props) {
  const[user] = useAuthState(props.auth)
  const signOut = () => {
    props.auth.signOut();
  };
  return (
    <div className='home'>
      {user? (
        <button onClick={signOut}>Sign Out</button>
      ):(<p>login</p>)}
      
    </div>
  )
}
