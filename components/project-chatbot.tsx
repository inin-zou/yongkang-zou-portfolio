"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff, Minimize2, Maximize2 } from "lucide-react"
import { useSound } from "@/components/sound-provider"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ProjectChatbotProps {
  onMinimizeChange?: (isMinimized: boolean) => void
}

export default function ProjectChatbot({ onMinimizeChange }: ProjectChatbotProps) {
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
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    <div className={`chatbot-container ${isMinimized ? "minimized" : ""}`}>
      <div className="chatbot-header">
        <div>
          <h3 className="chatbot-title">PROJECT Q&A ASSISTANT</h3>
          <p className="chatbot-subtitle">Ask me about Yongkang's projects</p>
        </div>
        <button
          className="minimize-button"
          onClick={() => {
            playSound("click")
            const newMinimizedState = !isMinimized
            setIsMinimized(newMinimizedState)
            onMinimizeChange?.(newMinimizedState)
          }}
          aria-label={isMinimized ? "Maximize" : "Minimize"}
        >
          {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
        </button>
      </div>

      <div className="chatbot-content">
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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

      <div className="chatbot-input-wrapper">
        <button className={`voice-button ${isListening ? "active" : ""}`} onClick={toggleVoice}>
          {isListening ? <Mic size={18} /> : <MicOff size={18} />}
        </button>
        <input
          type="text"
          className="chatbot-input"
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}