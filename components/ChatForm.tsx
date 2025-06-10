'use client'

import React, { useState } from 'react'

//declaring the chatform interface

const ChatForm = ({onSendMessage}: { onSendMessage: (message: string) => void;}) => {
    const [message, setMessage] = useState("");
    
    
    // similar to writing a function, here the value of the function is stored in const 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       if (message.trim() !== ""){
        setMessage("")
       }
    } 
 
    return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
        <input type="text" onChange={(e) => {
            setMessage(e.target.value)
        }} placeholder='Type your message here...' className='flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none' />
        <button type='submit' className='px-4 py-2 text-white rounded-lg bg-blue'></button>
    </form>
  )
}

export default ChatForm
