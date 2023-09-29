import { useState } from "react";
import { collection, query, where,updateDoc, setDoc, getDoc,getDocs, doc, serverTimestamp, arrayUnion } from "firebase/firestore";
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
    const combinedID = currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid;

    try {
      const chatRef = await getDoc(doc(db, "chats", combinedID));
      const currUserChatRef  = await getDoc(doc(db, "userChats", currentUser.uid));
      const userChatRef  = await getDoc(doc(db, "userChats", user.uid));

      if(!chatRef.exists()){
        await setDoc(doc(db, "chats", combinedID), {messages:[]});

        if (currUserChatRef.exists()){

          await updateDoc(doc(db, "userChats", currentUser.uid ),{
            chats:arrayUnion({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            combinedID: combinedID,
          })});
        }
        else{
          const chat = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            combinedID: combinedID,
            is_Chat: false,
            sentAt: serverTimestamp()
          }
          const currentUserref = doc(db, "userChats", "user");
          await setDoc(currentUserref,{});
          const subcollectionRef = collection(currentUserref, currentUser.uid);
          await setDoc(doc(subcollectionRef, user.id), chat);


        }
        if (userChatRef.exists()){
        await updateDoc(doc(db, "userChats", user.uid ),{
          chats:arrayUnion({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            combinedID: combinedID,
            // sentAt: serverTimestamp(),
        })})
        }
      else{
        const chat = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          combinedID: combinedID,
          is_Chat: false,
          sentAt: serverTimestamp()
        }
        const currentUserref = doc(db, "userChats", "user");
        // await setDoc(currentUserref,{});
        const subcollectionRef = collection(currentUserref, currentUser.uid);
        await setDoc(doc(subcollectionRef, user.id), chat);
      }
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
