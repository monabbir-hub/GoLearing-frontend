import { useEffect, useRef } from 'react'

export default function useOutsideClick(cb) {
  const el = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (el.current?.contains(e.target)) return
      cb?.()
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return { el }
}
