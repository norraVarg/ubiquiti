import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const OFFSET = 8 // px
const DELAY = 250

interface Visibility {
  isAboveVisible: boolean | null
  isBelowVisibile: boolean | null
}

export const useVisibility = (
  containerRef: RefObject<HTMLElement>,
  contentRef: RefObject<HTMLElement>,
): Visibility => {
  const [visibility, setVisibility] = useState<Visibility>({
    isAboveVisible: null,
    isBelowVisibile: null,
  })

  // not use useState to reduce rerendering when state changes
  const observerConnected = useRef<boolean>(false)
  const timeoutId = useRef<number | null>(null)

  const observer = useMemo(() => {
    return new IntersectionObserver(
      () => {
        const container = containerRef.current
        const content = contentRef.current

        if (!container || !content) return

        const containerRect = container.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()

        const isAboveVisible = contentRect.top >= containerRect.top - OFFSET
        const isBelowVisibile = contentRect.bottom <= containerRect.bottom + OFFSET

        setVisibility({ isAboveVisible, isBelowVisibile })
      },
      {
        threshold: 1 // triggered when entire target element is visible
      })
  }, [containerRef, contentRef])

  const handleScroll = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    if (observerConnected.current) {
      observer.disconnect()
      observerConnected.current = false
    }

    // debounce observer content on scroll for better performance
    timeoutId.current = window.setTimeout(() => {
      const content = containerRef.current

      if (content) {
        observer.observe(content)
        observerConnected.current = true
      }
    }, DELAY)
  }, [observer, contentRef])

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // observe content on inital render
    observer.observe(content)
    observerConnected.current = true

    container.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      container.removeEventListener('scroll', handleScroll)
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [containerRef, contentRef, handleScroll, observer])

  return visibility
}