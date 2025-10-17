import { createContext, useContext } from 'react'

import { useAppSelector } from '@renderer/app/hooks'
import { selectStep } from '@renderer/slices/registerSlice'

const StepContext = createContext<number>(1)
const useStep = (): number => useContext(StepContext)

type RootProps = { children: React.ReactNode }
type StepProps = { when: number; children: React.ReactNode }

function Stepper({ children }: RootProps): React.JSX.Element {
  const step = useAppSelector(selectStep)
  return <StepContext.Provider value={step}>{children}</StepContext.Provider>
}

export function Step({ when, children }: StepProps): React.JSX.Element | null {
  const step = useStep()
  return step === when ? <>{children}</> : null
}

export default Stepper
