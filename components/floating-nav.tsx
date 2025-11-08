"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, User, PenTool, Music, Mail, Github, Linkedin } from "lucide-react"
import { useSound } from "./sound-provider"

export default function FloatingNav() {
  const pathname = usePathname()
  const { playSound } = useSound()

  const handleClick = () => {
    playSound("click")
  }

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={16} />, color: "nav-button-blue" },
    { name: "Projects", path: "/projects", icon: <FolderOpen size={16} />, color: "nav-button-cyan" },
    { name: "About", path: "/about", icon: <User size={16} />, color: "nav-button-magenta" },
    { name: "Writing", path: "/writing", icon: <PenTool size={16} />, color: "nav-button-yellow" },
    { name: "Music", path: "/music", icon: <Music size={16} />, color: "nav-button-green" },
    { name: "Contact", path: "/contact", icon: <Mail size={16} />, color: "nav-button-red" },
    {
      name: "GitHub",
      path: "https://github.com/inin-zou",
      icon: <Github size={16} />,
      color: "nav-button-cyan",
      external: true,
    },
    {
      name: "LinkedIn",
      path: "https://linkedin.com/in/yongkang-zou",
      icon: <Linkedin size={16} />,
      color: "nav-button-blue",
      external: true,
    },
  ]

  return (
    <div className="floating-nav">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          className={`nav-button ${item.color} ${pathname === item.path ? "active" : ""}`}
          title={item.name}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}
