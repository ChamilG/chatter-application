import React from 'react'
import { auth, db } from "../Firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import TypeWriter from "../components/TypeWriter";

export default function Login() {
  const addUser = async()=>{
    const { uid, displayName, photoURL } = auth.currentUser;
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
   
    if(!userDoc.exists()){

      const data = {
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
      }
      await setDoc(userRef, data);
      // create empty documents for each user in userChats collection
      await setDoc(doc(db, "userChats", uid), {});
    }
  }
  const googleSignIn = async () =>{
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
          addUser();
          
        } catch (error) {
           console.log(error)  
        }
  };
  const facebookSignIn = () =>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
};
  return (
    <div className='welcome'>
        <TypeWriter/>
        <div  className='welcome-container'>
          <Button variant="contained" 
          className='welcome-btn'
          color="error"
          onClick={googleSignIn}>
          <GoogleIcon style={{marginRight: "10px"}} /> Sign in with Google
          </Button>

          {/* <Button variant="contained" 
          className='welcome-btn'
          onClick={facebookSignIn}>
            <FacebookIcon style={{marginRight: "10px"}} />  Sign in with facebook
          </Button> */}
            
        </div>
    </div>
  )
}
