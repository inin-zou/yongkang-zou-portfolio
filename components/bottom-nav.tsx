"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FlaskRoundIcon as Flask,
  Lightbulb,
  Camera,
  Github,
  Mail,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useSound } from "./sound-provider"

export default function BottomNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { isMuted, toggleMute, playSound } = useSound()

  const handleClick = () => {
    playSound("click")
  }

  const handleThemeToggle = () => {
    playSound("click")
    setTheme(theme === "dark" ? "cyberpunk" : "dark")
  }

  const handleMuteToggle = () => {
    toggleMute()
  }

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} />, color: "nav-button-blue" },
    { name: "Projects", path: "/projects", icon: <Flask size={18} />, color: "nav-button-cyan" },
    { name: "Skills", path: "/skills", icon: <Lightbulb size={18} />, color: "nav-button-magenta" },
    { name: "Gallery", path: "/gallery", icon: <Camera size={18} />, color: "nav-button-yellow" },
    { name: "GitHub", path: "https://github.com", icon: <Github size={18} />, color: "nav-button-red", external: true },
    { name: "Contact", path: "/contact", icon: <Mail size={18} />, color: "nav-button-green" },
  ]

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={handleClick}
        >
          <div className={`nav-button ${item.color} ${pathname === item.path ? "active" : ""}`} title={item.name}>
            {item.icon}
          </div>
        </Link>
      ))}
      <div className="nav-button nav-button-yellow" onClick={handleThemeToggle} title="Toggle Theme">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </div>
      <div className="nav-button nav-button-blue" onClick={handleMuteToggle} title="Toggle Sound">
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </div>
    </div>
  )
}
