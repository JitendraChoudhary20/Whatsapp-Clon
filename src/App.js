import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./Login";
import {LoginContext} from "./LoginContext";
import Register from "./Register";



function App() {
const[userLogin, setUserLogin] = useState(false);
const [userName, setUserName] = useState("");

  return (    
      <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setUserName}}>
      {!userLogin ? (
        <div className="register_login">
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>

          </Routes>
        </div>
      ):(
        <div className="app__body">
            <Sidebar userName={userName}/>

          <Routes> 
          

            <Route path="/" element={<Chat userName={userName}/>}></Route>
          
            <Route path="room/:roomId" element={<Chat userName={userName}/>} />
           
           
          </Routes>
        
        </div>
          ) } 
  </LoginContext.Provider>
      </div>
      </BrowserRouter>
     
  );
}

export default App;