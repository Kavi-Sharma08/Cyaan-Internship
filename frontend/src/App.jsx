import { Outlet } from "react-router-dom";
import { UserContext  } from "./Contexts/UserContext";
import { useContext } from "react";
import SignupPage from "./pages/SignupPage";
import AllPostPage from "./pages/AllPostPage";
const App = () => {
  const {user} = useContext(UserContext)
  if(!user){
    return <SignupPage/>
  }
  if(user){
    return <AllPostPage/>
  }
};


export default App;
