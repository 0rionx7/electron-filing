import React, { createContext, useState } from 'react'

import FirstStep from '@renderer/components/routingFlow/FirstStep'
import FirstStep2 from '@renderer/components/routingFlow/FirstStep2'
import FirstStep3 from '@renderer/components/routingFlow/FirstStep3'
import FirstStepB from '@renderer/components/routingFlow/FirstStepB'
import FlowControl from '@renderer/components/routingFlow/FlowControl'
import SecondStep from '@renderer/components/routingFlow/SecondStep'
import SecondStep2 from '@renderer/components/routingFlow/SecondStep2'
import SecondStep3 from '@renderer/components/routingFlow/SecondStep3'
import SecondStepB from '@renderer/components/routingFlow/SecondStepB'
import ThirdStep from '@renderer/components/routingFlow/ThirdStep'
import ThirdStep2 from '@renderer/components/routingFlow/ThirdStep2'
import ThirdStep3 from '@renderer/components/routingFlow/ThirdStep3'
import ThirdStepB from '@renderer/components/routingFlow/ThirdStepB'
import Welcome from '@renderer/components/routingFlow/Welcome'

type ComponentProps = {
  handleNext: (selectedFlow?: string) => void
  handleBack: () => void
}

type RoutingContextType = {
  handleNext: (flow?: string) => void
  handleBack: () => void
  Component: (props: ComponentProps) => React.JSX.Element
  canNext: boolean
}

export const RoutingContext = createContext<RoutingContextType>({
  handleNext: () => {},
  handleBack: () => {},
  Component: Welcome,
  canNext: true
})

export const flowMap = {
  base: [
    { type: 'comp', component: Welcome },
    { type: 'comp', component: FirstStepB },
    { type: 'comp', component: SecondStepB },
    { type: 'comp', component: ThirdStepB },
    { type: 'switch', component: FlowControl }
  ],
  flow1: [
    { type: 'comp', component: FirstStep },
    { type: 'comp', component: SecondStep },
    { type: 'comp', component: ThirdStep },
    { type: 'switch', component: FlowControl }
  ],
  flow2: [
    { type: 'comp', component: FirstStep2 },
    { type: 'comp', component: SecondStep2 },
    { type: 'comp', component: ThirdStep2 }
    // { type: 'switch', component: FlowControl }
  ],
  flow3: [
    { type: 'comp', component: FirstStep3 },
    { type: 'comp', component: SecondStep3 },
    { type: 'comp', component: ThirdStep3 }
    // { type: 'switch', component: FlowControl }
  ]
}

function Stepper({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [position, setPosition] = useState({ flow: 'base', step: 0 })
  const [flowSequence, setFlowSequence] = useState(['base'])
  const [canNext, setCanNext] = useState(true)

  const { step, flow } = position

  const handleNext = (selectedFlow?: string): void => {
    if (selectedFlow) {
      setFlowSequence((pr) => [...pr, selectedFlow])
      setPosition({ flow: selectedFlow, step: 0 })
    } else {
      setPosition({ flow, step: step + 1 })
      if (flowMap[flow][step + 1].type === 'comp' && step + 2 === flowMap[flow].length)
        setCanNext(false)
    }
  }

  const handleBack = (): void => {
    setCanNext(true)
    if (step !== 0) {
      setPosition({ flow, step: step - 1 })
    } else {
      const newFlow = flowSequence.at(-2)!
      const newStep = flowMap[newFlow].length - 1
      setPosition({ flow: newFlow, step: newStep })
      const newFlowSequence = flowSequence.slice(0, flowSequence.length - 1)
      setFlowSequence(newFlowSequence)
    }
  }
  const Component = flowMap[flow][step].component

  return (
    <RoutingContext value={{ handleNext, handleBack, Component, canNext }}>
      {children}
    </RoutingContext>
  )
}

export default Stepper
