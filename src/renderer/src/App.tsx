import Base from '@renderer/components/routingFlow/Base'
import Stepper from '@renderer/components/routingFlow/RoutingContext'
import Welcome from '@renderer/components/routingFlow/Welcome'

function App(): React.JSX.Element {
  return (
    <Stepper>
      <Base />
    </Stepper>
  )
}

export default App
