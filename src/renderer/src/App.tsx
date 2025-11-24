import { Outlet } from 'react-router'

import Stepper from '@renderer/components/routingFlow/RoutingContext'

function App(): React.JSX.Element {
  return (
    <Stepper>
      <Outlet />
    </Stepper>
  )
}

export default App
