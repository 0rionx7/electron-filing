import { createContext, useContext } from 'react'

import { selectStep } from '@renderer/slices/registerSlice'
import { useAppSelector } from '@renderer/app/hooks'

const StepContext = createContext<number>(1)
const useStep = (): number => useContext(StepContext)

type StepperProps = { children: React.ReactNode }
type StepProps = { when: number; children: React.ReactNode }

function Stepper({ children }: StepperProps): React.JSX.Element {
  const step = useAppSelector(selectStep)
  return <StepContext value={step}>{children}</StepContext>
}

export function Step({ when, children }: StepProps): React.JSX.Element | null {
  const step = useStep()
  return step === when ? <>{children}</> : null
}

export default Stepper
