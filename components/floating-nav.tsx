"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, User, PenTool, Music, Mail, Github, Linkedin } from "lucide-react"
import { useSound } from "./sound-provider"
import GlassSurface from "./GlassSurface"

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
    // { name: "Writing", path: "/writing", icon: <PenTool size={16} />, color: "nav-button-yellow" },
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
    <div className="floating-nav-wrapper">
      <GlassSurface
        width={400}
        height={56}
        borderRadius={30}
        brightness={20}
        opacity={0.8}
        blur={15}
        displace={8}
        distortionScale={-150}
        redOffset={5}
        greenOffset={10}
        blueOffset={15}
        mixBlendMode="screen"
        className="floating-nav-glass"
      >
        <div className="floating-nav-content">
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
      </GlassSurface>
    </div>
  )
}
