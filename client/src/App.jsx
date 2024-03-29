import React, { useState } from 'react'
import io from "socket.io-client"
import Chat from './Chat'
import music from "./iphone1.mp3"


const socket = io.connect("http://localhost:3000")

const App = () => {

   const [username, setUserName] = useState("")
   const [room, setRoom] = useState("")
   const [showChat, setShowChat] = useState(false)

   const notification = new Audio(music)

   const join_chat=()=>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
      notification.play()
    }
   }

  return (
  <>
  {
    !showChat && (
      <div className="join_room">
      <h1>Join Room</h1>
      <input type="text" 
       placeholder='Enter Your Name' 
       onChange={(e)=>setUserName(e.target.value)}
      />
      <input type="text" 
       placeholder='Enter Chat Room'
       onChange={(e)=>setRoom(e.target.value)}
       />
      <button onClick={join_chat}>JOIN</button>
     </div>
    )
  }
  
  {
    showChat && (
      
   <Chat socket={socket} username={username} room={room}/>
    )
  }


  </>
  )
}

export default App
