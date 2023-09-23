import './App.css';
import Login from './pages/Login';
import Account from "./pages/Account"
import NavBar from './components/NavBar';
import { auth } from "./Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <NavBar auth={auth}/>
      {user ? (<Account/>): (<Login/>)}
    </div>
  );
}

export default App;
