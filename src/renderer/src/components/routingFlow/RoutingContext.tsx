import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

import { routingMap } from '@renderer/main'

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
    const nextRoute = Object.keys(routingMap[branch][selectedFlow ? 0 : step + 1])[0]
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
      const nextRoute = Object.keys(routingMap[flow][step - 1])[0]
      const nextPath =
        nextRoute === 'index' ? '/' : `${flow !== 'base' ? `/${flow}` : ''}/${nextRoute}`
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
