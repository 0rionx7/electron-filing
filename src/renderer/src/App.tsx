import { useEffect } from 'react'

import AccountDetails from '@renderer/components/AccountDetails'
import { SelectFiles } from '@renderer/components/SelectFiles'
import SelectFolder from '@renderer/components/SelectFolder'
import PersonalInfo from '@renderer/components/PersonalInfo'
import Success from '@renderer/components/Success'
import Stepper, { Step } from '@renderer/components/Stepper'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { selectExpressPort, setExpressPort, setPorts } from '@renderer/slices/backendPortsSlice'
import { useHandShakeExpressQuery } from '@renderer/api/api'

function App(): React.JSX.Element {
  const expressPort = useAppSelector(selectExpressPort)
  const { data } = useHandShakeExpressQuery(undefined)
  const dispatch = useAppDispatch()

  const handleFetch = async (): Promise<void> => {
    const response = await fetch(`http://localhost:${expressPort}`)
    const msg = await response.json()
    console.log(msg)
  }
  console.log(expressPort, data)

  useEffect(() => {
    const urlUnsubscribe = window.api.onReceiveExpressPort((port) => dispatch(setExpressPort(port)))
    const portsUnsubscribe = window.api.onReceivePortlist((list) => dispatch(setPorts(list)))

    return () => {
      urlUnsubscribe()
      portsUnsubscribe()
    }
  }, [dispatch])

  return (
    <Stepper>
      <Button onClick={handleFetch} className="mb-1 bg-teal-400 hover:bg-teal-600">
        HandShake
      </Button>
      <Step when={1}>
        <AccountDetails />
      </Step>
      <Step when={2}>
        <PersonalInfo />
      </Step>
      <Step when={3}>
        <SelectFolder />
      </Step>
      <Step when={4}>
        <SelectFiles />
      </Step>
      <Step when={5}>
        <Success />
      </Step>
    </Stepper>
  )
}

export default App
