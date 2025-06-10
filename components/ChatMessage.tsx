import React from 'react'

interface chatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean
}

function ChatMessage({sender, message, isOwnMessage}: chatMessageProps) {
    const isSystemMessage = sender === 'system'
  return (
    <div className={`flex ${ isSystemMessage ? 'justify-center' : isOwnMessage ? 'justify-end' : ' justify-start'} mb-3`}>

      <div className={`max-w-xs px-4 py-2 rounded-lg`}>
        {!isSystemMessage &&  <p className='text-sm font-bold'>{sender}</p>}
      </div>
    </div>
  )
}

export default ChatMessage

// style for single message 