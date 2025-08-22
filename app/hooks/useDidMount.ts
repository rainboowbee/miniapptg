import { useEffect, useState } from 'react'

/**
 * Хук для определения, был ли компонент смонтирован
 * @returns true, если компонент был смонтирован
 */
export function useDidMount(): boolean {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  return didMount
}
