'use client'

import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "./lib/socketClients";

export default function Home() {
  const [ room, setRoom ] = useState("");
  const [ joined, setJoined ] = useState(false);
  const [ messages, setMesages ] = useState<{sender: string; message: string} []>([])
  const [ userName, setUserName ] = useState("");
  
  useEffect(() => {
    socket.on('user-joined', (data) => {
      console.log(data);
      setMesages((prev) => [...prev, { sender: 'system', message: data }])
    })
  }, [])  // need to fix this bug here 

  // return  () => {
  //   socket.off('user-joined');
  //   socket.off('message');
  // }

  const handleJoinRoom = () => {
    setJoined(true)
  }

  const handleSendMessage = (message: string) => {
    console.log(message);
  }

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <div className="flex w-full max-w-3xl mx-auto flex-col items-center" >
          <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
          <input type="text" value={userName}
          placeholder="Enter your username" 
          onChange ={(e) => setUserName(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
          />
          <input type="text" value={room}
          placeholder="Enter a room" 
          onChange ={(e) => setRoom(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
          />
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-64 h-12" 
          onClick={handleJoinRoom}
          
          >Submit</button>
          </div>
      ): (
        <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 text-2xl fon-bold">Room: 1</h1>
        <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border2 rounded-lg">
          {messages.map((msg, index ) => (
            <ChatMessage 
            key={index}
            sender={msg.sender}
            message={msg.message}
            isOwnMessage={msg.sender === userName}/>
           ))}
        </div>
        <ChatForm onSendMessage={handleSendMessage}/>
      </div>
      )}
    </div>
  );
}
