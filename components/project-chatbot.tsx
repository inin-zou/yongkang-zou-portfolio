"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff } from "lucide-react"
import { useSound } from "@/components/sound-provider"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ProjectChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Yongkang's AI assistant. Ask me anything about his projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Mark as mounted to avoid SSR/client time formatting mismatch
    setMounted(true)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })

  const handleSend = async () => {
    if (!inputValue.trim()) return

    playSound("click")

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()

      const botResponse: Message = {
        id: messages.length + 2,
        text: data.message || "Sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      playSound("success")
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }



  const toggleVoice = () => {
    playSound("click")
    setIsListening(!isListening)
    // Voice recognition logic would go here
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div>
          {/* <h3 className="chatbot-title">PROJECT Q&A ASSISTANT</h3> */}
          <p className="chatbot-subtitle">Ask me about Yongkang's projects</p>
        </div>
      </div>

      <div className="chatbot-content">
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">{message.text}</div>
              <div className="message-time">
                {mounted ? formatTime(message.timestamp) : "--:--"}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="message-content">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-3d-model">
          <div className="model-placeholder">
            <div className="cyber-grid"></div>
          </div>
        </div>
      </div>

      <div className="container-ia-chat">
        <input
          type="checkbox"
          name="input-voice"
          id="input-voice"
          className="input-voice"
          style={{ display: 'none' }}
          checked={isListening}
          onChange={toggleVoice}
        />
        <input
          type="text"
          name="input-text"
          id="input-text"
          placeholder="Ask Anything..."
          className="input-text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <label htmlFor="input-voice" className="label-voice">
          <svg className="icon-voice" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 4v16m4-13v10M8 7v10m12-6v2M4 11v2"></path>
          </svg>
          <div className="ai">
            <div className="container">
              <div className="c c4"></div>
              <div className="c c1"></div>
              <div className="c c2"></div>
              <div className="c c3"></div>
              <div className="rings"></div>
            </div>
            <div className="glass"></div>
          </div>
          <div className="text-voice">
            <p>Conversation Started</p>
            <p>Press to cancel the conversation</p>
          </div>
        </label>
        <label htmlFor="input-text" className="label-text" onClick={handleSend}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12l7-7l7 7m-7 7V5"></path>
          </svg>
        </label>
      </div>
    </div>
  )
}