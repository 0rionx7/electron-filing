import { createContext, useContext } from 'react'

import { selectStep } from '@renderer/slices/registerSlice'
import { useAppSelector } from '@renderer/app/hooks'
import useGotoStep from '@renderer/hooks/useGotoStep'
import StepAlert from '@renderer/components/StepAlert'

const StepContext = createContext<number>(1)
const useStep = (): number => useContext(StepContext)

type StepperProps = { children: React.ReactNode }
type StepProps = { when: number; children: React.ReactNode }

function Stepper({ children }: StepperProps): React.JSX.Element {
  const { openAlert, setOpenAlert } = useGotoStep()
  const step = useAppSelector(selectStep)

  return (
    <StepContext value={step}>
      <StepAlert isOpen={openAlert} setOpenAlert={setOpenAlert} />
      {children}
    </StepContext>
  )
}

export function Step({ when, children }: StepProps): React.JSX.Element | null {
  const step = useStep()
  return step === when ? <>{children}</> : null
}

export default Stepper
