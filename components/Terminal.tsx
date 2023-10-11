'use client'

import { FC, useEffect, useState, useRef } from 'react'
import { FaMinus, FaPlus, FaSquare, FaTimes } from 'react-icons/fa'

interface TerminalProps {
  messages: string[]
}

const Terminal: FC<TerminalProps> = ({ messages }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [showInput, setShowInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessage('')
      let i = 0
      const intervalId = setInterval(() => {
        if (i < messages[0].length) {
          setCurrentMessage((prevMessage) => prevMessage + messages[0].charAt(i))
          i++
        } else {
          clearInterval(intervalId)
          setShowInput(true)
          inputRef.current?.focus()
        }
      }, 50)
    }
  }, [messages])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      switch (inputValue.toLowerCase()) {
        case 'about':
          window.location.href = '/about'
          break
        case 'blog':
          window.location.href = '/blog'
          break
        case 'github':
          window.location.href = 'https://github.com/bcdunbar'
          break
        case 'linkedin':
          window.location.href = 'https://linkedin.com/in/brandendunbar'
          break
        default:
          setMessages([...messages, `Command not found: ${inputValue}`])
          break
      }
      setInputValue('')
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        fontSize: '16px',
        padding: '0',
        borderRadius: '5px',
        lineHeight: '1.5',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '80%',
        maxWidth: '800px',
        minWidth: '600px',
        minHeight: '400px',
        maxHeight: '600px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1c1c1c',
          padding: '5px 10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#ff5f56', width: '12px', height: '12px', borderRadius: '50%', marginRight: '5px' }} />
          <div style={{ backgroundColor: '#ffbd2e', width: '12px', height: '12px', borderRadius: '50%', marginRight: '5px' }} />
          <div style={{ backgroundColor: '#27c93f', width: '12px', height: '12px', borderRadius: '50%', marginRight: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaMinus style={{ marginRight: '10px' }} />
          <FaSquare style={{ marginRight: '10px' }} />
          <FaTimes />
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: 'Consolas, monospace',
          fontSize: '16px',
          padding: '20px',
          borderRadius: '0 0 5px 5px',
          lineHeight: '1.5',
          width: '100%',
          height: 'calc(100% - 60px)',
          overflow: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <span style={{ color: '#00ff00' }}>$ </span>
            {index === 0 ? (
              <span>{currentMessage}</span>
            ) : (
              <>
                <span>{message}</span>
                <br />
              </>
            )}
          </div>
        ))}
      </div>
      {showInput && (
        <div 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'transparent', 
                padding: '20px' 
                }}>
            <span style={{ color: '#00ff00' }}>$ </span>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontFamily: 'Consolas, monospace',
                fontSize: '16px',
                padding: '0',
                borderRadius: '0',
                lineHeight: '1.5',
                border: 'none',
                width: '100%',
                outline: 'none',
                }}
            />
        </div>
      )}
    </div>
  )
}

export default Terminal