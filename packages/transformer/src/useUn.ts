import { useContext } from 'react'
import { UnContext } from './context'

export function useUn() {
  return useContext(UnContext)
}
