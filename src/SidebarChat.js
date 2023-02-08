import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {db} from "./FirebaseSeting.js"
import "./css/Sidebar.css"
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function SidebarChat({id,name, addnewchat}) {
  const [seed, setSeed] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    if(id){
      const q = query(collection(db,"contactsChat",id,"messages")
      ,orderBy("timeStamp","asc"));

      const getMessage = onSnapshot(q,(snapshot)=>{
          snapshot.docs.forEach((doc)=>{
          setMsg(doc.data())
        });
    })
  }
  },[id]);

  useEffect(()=>{
  //   // useEffect is run once when brouser open
  //   // seed is setting for getting different Avatars
    setSeed(Math.floor(Math.random() * 5000));
  },[])

  const createChat=async()=>{
    let room = prompt("pls enter room name");

    // to add new chat in database OR CREATING NEW ROOMS DYNAMICALLY
    
    if(room){
      try {
        const docRef = await addDoc(collection(db, "contactsChat"), {
         name : room
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
    }
  }
  

  return (
    // if props-addnewchat not passes in sidebarchat then render room name
    !addnewchat ? (
      // Link will redirect to mention path when click
      <Link to={`/room/${id}`}>
              <div className='sidebar__chat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                {/* avatars src is used for using diffrent diffrent avatars */}
                <div className="sidebar__chatInfo">
                <h2>{name}</h2>
                <p>{msg.message}</p>
                </div>      
              </div>
    </Link>
    ) : (
      // if props-addnewchat passes in sidebarchat then heading Add New Chat will be render
      <div className="sidebar__chat" onClick={createChat}>
      <h2>Add New Chat</h2>
      </div>    
  )
  )
    }


export default SidebarChat