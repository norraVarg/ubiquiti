import React, { createContext, useContext, useState, ReactNode } from 'react'
import CloseButton from '../../component-lib/CloseButton/CloseButton'

interface ModalContextType {
  isOpen: boolean
  open: (options: { content: ReactNode, title?: string }) => void
  close: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [title, setTitle] = useState<string | undefined>(undefined)

  const open = ({ content: modalContent, title: modalTitle }: { content: ReactNode, title?: string }) => {
    setContent(modalContent)
    setTitle(modalTitle)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setContent(null)
    setTitle(undefined)
  }

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && <Modal title={title}>{content}</Modal>}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

interface ModalProps {
  title?: string
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const { close } = useModal()

  return (
    <div className="flex justify-center items-center z-50 fixed top-0 left-0 w-full h-full bg-web-unifi-text-0 bg-opacity-50" onClick={close}>
      <div className="flex flex-col gap-2 m-40 relative rounded-lg p-3 bg-web-unifi-color-neutral-0" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between'>
          {title && <h2 className="text-web-unifi-text-1 font-bold">{title}</h2>}
          <CloseButton onClick={close} />
        </div>
        {children}
      </div>
    </div>
  )
}