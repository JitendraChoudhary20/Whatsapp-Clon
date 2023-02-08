import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./css/Sidebar.css";
import SidebarChat from "./SidebarChat.js";
import { db } from "./FirebaseSeting.js";
import { getDocs, collection, onSnapshot } from "@firebase/firestore";

function Sidebar({userName}) {
  

  const [room, setRoom] = useState([]);
  const [seed, setSeed] = useState("");

  useEffect(()=>{
   setSeed(Math.random()*1000);
   },[]);
  

 const getContacts = ()=>{
 
  const getData = onSnapshot(collection(db, "contactsChat"),(snapshot)=>{
  
  let roomList = [];
  snapshot.docs.forEach((doc) => {
  roomList.push({
    id:doc.id,
    ...doc.data()
  });
});

setRoom(roomList);
 });
};

useEffect(()=>{
  getContacts();
 },[]);

  

  return (
    <div className="sidebar">
      <div className="sidebar__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <h3>{userName}</h3>
        {/* avatars "src" is used for using diffrent diffrent avatars */}
        <div className="sidebar__headerRight">
          {/* //to get hover effect IconButton is used // */}
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>
      <div className="sidebar__Chats">
        {/* for 'Add New Chat' Heading, we passed addnewchat props and use with condition if
      props present then show heading otherwise render sidebar__chat div Now it will appear
       at top bcz it pass in 1st sidebarChat */}

        <SidebarChat addnewchat />
        {
          room.map((room)=>{
            return <SidebarChat key={room.id} name={room.name} id={room.id} />
          })
        }

      </div>
    </div>
  );
}
export default Sidebar;