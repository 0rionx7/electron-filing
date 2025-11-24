import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

type RoutingContextType = {
  handleNext: (flow?: string) => void
  handleBack: () => void
  canMove: { back: boolean; next: boolean }
}
export const RoutingContext = createContext<RoutingContextType>({
  handleNext: () => {},
  handleBack: () => {},
  canMove: { back: false, next: true }
})

export const routingMap = {
  base: ['', 'personalInfo', 'flowControl'],
  flow1: ['f1step1', 'f1step2', 'f1step3'],
  flow2: ['f2step1', 'f2step2', 'f2step3'],
  flow3: ['f3step1', 'f3step2', 'f3step3']
}

function Stepper({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [position, setPosition] = useState({ flow: 'base', step: 0 })
  const [canMove, setCanMove] = useState({ back: false, next: true })
  const navigate = useNavigate()

  const handleNext = (selectedFlow?: string): void => {
    const { step, flow } = position
    if (selectedFlow) {
      setPosition({ flow: selectedFlow, step: 0 })
      setCanMove({ back: true, next: true })
    } else {
      setPosition({ flow, step: step + 1 })
      setCanMove({ back: true, next: step + 1 !== routingMap[flow].length - 1 })
    }
    const branch = selectedFlow || flow
    const nextRoute = routingMap[branch][selectedFlow ? 0 : step + 1]
    if (nextRoute) {
      const nextPath = `${branch !== 'base' ? `/${branch}` : ''}/${nextRoute}`
      navigate(nextPath)
    }
  }

  const handleBack = (): void => {
    const { step, flow } = position
    if (step !== 0) {
      setPosition({ flow, step: step - 1 })
      setCanMove({ back: step > 1 || (step === 1 && flow !== 'base'), next: true })
      const nextRoute = routingMap[flow][step - 1]
      const nextPath = `${flow !== 'base' ? `/${flow}` : ''}/${nextRoute}`
      navigate(nextPath)
    } else if (flow !== 'base') {
      setPosition({ flow: 'base', step: 2 })
      setCanMove({ back: true, next: true })
      navigate('flowControl')
    }
  }

  return <RoutingContext value={{ handleNext, handleBack, canMove }}>{children}</RoutingContext>
}

export default Stepper
