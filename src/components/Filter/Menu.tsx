import React, { useState, useRef, useEffect } from 'react'

interface Props {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const Menu: React.FC<Props> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative'>
      <div onClick={toggleMenu} className='cursor-pointer' ref={triggerRef}>
        {trigger}
      </div>
      {isOpen && (
        <div className='absolute top-full right-0 translate-y-2 z-40 p-4 rounded-lg shadow bg-web-unifi-color-neutral-0 border border-web-unifi-color-neutral-3' ref={menuRef}>
          {children}
        </div>
      )}
    </div>
  )
}
