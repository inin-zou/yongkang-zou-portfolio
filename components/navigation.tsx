"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "HOME", path: "/", color: "text-electric-blue" },
    { name: "PROJECTS", path: "/projects", color: "text-hot-magenta" },
    { name: "ABOUT", path: "/about", color: "text-pixel-green" },
    { name: "WRITING", path: "/writing", color: "text-deep-purple" },
    { name: "MUSIC", path: "/music", color: "text-neon-yellow" },
    { name: "CONTACT", path: "/contact", color: "text-bright-red" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="py-4 px-4 sm:px-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-sm sm:text-base font-bold flex items-center">
          <span className="text-electric-blue mr-1">&gt;</span>
          <span className="blinking-cursor text-gradient">YONGKANG_ZOU</span>
        </Link>

        <div className="hidden sm:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-xs transition-all duration-200 ${
                pathname === item.path ? `${item.color} glow` : "text-light-gray hover:text-electric-blue"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button className="sm:hidden pixel-button p-1" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 pixel-card">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-xs transition-colors ${
                  pathname === item.path ? item.color : "text-light-gray hover:text-electric-blue"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-electric-blue mr-1">&gt;</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
