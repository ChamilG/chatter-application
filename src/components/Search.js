import { useState } from "react";
import { collection, query, where, setDoc, getDoc,getDocs, doc } from "firebase/firestore";
import {auth, db } from '../Firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Search() {
  const [currentUser] = useAuthState(auth);
  const[user, setUser] = useState(false);
  const[username, setUsername] = useState("")
  
  const handleSearch = async()=>{
    const q = query(collection(db, "users"), where("displayName", "==", username));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
      console.log(doc.data())
    });
   } catch (err) {
      console.log(err);
   }  
   setUsername("")
  };
  
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  
  const handleClickOnUser = async() =>{
 // creating a new chat if doesnot exist
    const combinedID = currentUser.uid + user.uid
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      if(!res.exists()){
        
        await setDoc(doc(db, "chats", combinedID), {messages:[]})
      }
    } catch (error) {
        console.log(error);
    }
    setUser(null);
  }
  return (
    <div className='search-container'>
        <div className='search-form'>
            <input 
            className="input"  
            type='text' 
            placeholder='find the user' 
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}/>
        </div>
        {user && <div className="userChat" onClick={handleClickOnUser}>
          <img className='user-image' src={user.photoURL} 
          alt=""/>
           <div className='userChatInfo' >
            <span className='span'>{user.displayName}</span>
          </div>
        </div>}  
    </div>
  )
}
