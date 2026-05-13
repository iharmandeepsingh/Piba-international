import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return { ref, isIntersecting }
}

export function useCounter(
  end: number,
  duration: number = 2000,
  start: number = 0
) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)
  const countRef = useRef(count)
  const startTimeRef = useRef<number | null>(null)

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }

    const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
    const currentCount = Math.floor(start + (end - start) * progress)
    
    if (countRef.current !== currentCount) {
      countRef.current = currentCount
      setCount(currentCount)
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      setIsAnimating(false)
    }
  }

  const startAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    startTimeRef.current = null
    requestAnimationFrame(animate)
  }

  return { count, startAnimation, isAnimating }
}

export function useTypewriter(
  text: string,
  speed: number = 50,
  delay: number = 0
) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
      currentIndexRef.current = 0
      setDisplayedText('')

      const typeChar = () => {
        if (currentIndexRef.current < text.length) {
          setDisplayedText(text.slice(0, currentIndexRef.current + 1))
          currentIndexRef.current++
          setTimeout(typeChar, speed)
        } else {
          setIsTyping(false)
        }
      }

      typeChar()
    }, delay)

    return () => clearTimeout(timer)
  }, [text, speed, delay])

  return { displayedText, isTyping }
}

export function useParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { offsetY }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
      return initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
