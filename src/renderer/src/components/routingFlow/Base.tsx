import { useContext } from 'react'

import { RoutingContext } from '@renderer/components/routingFlow/RoutingContext'

const Base = (): React.JSX.Element => {
  const { handleNext, handleBack, Component } = useContext(RoutingContext)

  return <Component handleNext={handleNext} handleBack={handleBack} />
}

export default Base
