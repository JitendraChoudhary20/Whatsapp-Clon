import React, { useEffect,useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./css/Chat.css";
import { useParams } from "react-router-dom";
import {collection, doc,addDoc, onSnapshot, serverTimestamp, query, orderBy} from "firebase/firestore";
import { db } from "./FirebaseSeting";


function Chat({userName}) {
  
  // To access the parameters of the current route=> useParams() is used.
  const {roomId} = useParams();
  const [roomName, setRoomName] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

 
 
  useEffect(()=>{
    // on changing roomId everytime useeffect call,
    //  it renders room name on chat section and its msgs

    if(roomId){
      const getRoom = onSnapshot(doc(db,"contactsChat",roomId),(doc)=>{
        setRoomName(doc.data().name);
      });
      const q = query(collection(db,"contactsChat",roomId,"messages")
      ,orderBy("timestamp","asc"));

      const getMessage = onSnapshot(q,(snapshot)=>{
        let msgList = [];

        snapshot.docs.forEach((doc)=>{
          msgList.push({
            ...doc.data()
            // doc.data() = will return whole data inside messages
          })
        });
        setMessages(msgList);
      })
    }

  },[roomId]);

  const sendMessage =async(e)=>{
    e.preventDefault();
    if(input===""){
      return alert("please Enter message");
    }
    {
    try{
      const sendData = await addDoc(collection(db, "contactsChat",roomId,"messages")
      ,{
        message: input,
        name:userName,
        timestamp:serverTimestamp()
      }
      );
      
      }catch(e){
        console.log("error",e);
    }
    setInput("");
  }
  };
 

  return (   

    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at {" "} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
        </div>

        <div className="header__right">
          {/* iconButton used for getting hover effect */}
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {
          messages.map((message)=>(
            <p className={`chat__message ${message.name===userName && "chat__receiver"}`}>
          <span className="chat__name">{message.name}</span>
        {message.message}
          <span className="chat__time">
            {new Date(message.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
          </span>
        </p>
          ))
        }     
        
      </div>
      
      <div className="chat__footer">
        <IconButton>
        <EmojiEmotionsIcon/>
        </IconButton>

        <IconButton>
        <AttachFileIcon/>
        </IconButton>
<form onSubmit={(e)=>{sendMessage(e)}}>
  <input type="text" value={input} placeholder="type your message " onChange={(e)=>setInput(e.target.value)}/>
  <input type="submit" />


</form>
        <IconButton>
        <MicIcon/>
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;