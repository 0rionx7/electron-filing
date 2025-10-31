import { useEffect } from 'react'

import { selectExpressPort, setExpressPort, setPorts } from '@renderer/slices/backendPortsSlice'
import AccountDetails from '@renderer/components/AccountDetails'
import { SelectFiles } from '@renderer/components/SelectFiles'
import SelectFolder from '@renderer/components/SelectFolder'
import PersonalInfo from '@renderer/components/PersonalInfo'
import Success from '@renderer/components/Success'
import Stepper, { Step } from '@renderer/components/Stepper'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { useHandShakeExpressQuery } from '@renderer/api/api'
import useGotoStep from '@renderer/hooks/useGotoStep'
import StepAlert from '@renderer/components/StepAlert'
import Area from '@renderer/components/Area'

function App(): React.JSX.Element {
  const expressPort = useAppSelector(selectExpressPort)
  const { data } = useHandShakeExpressQuery(undefined)
  const { openAlert, setOpenAlert } = useGotoStep()
  const dispatch = useAppDispatch()

  console.log(expressPort, data)

  const handleFetch = async (): Promise<void> => {
    const response = await fetch(`http://localhost:${expressPort}`)
    const msg = await response.json()
    console.log(msg)
  }

  useEffect(() => {
    const urlUnsubscribe = window.api.onReceiveExpressPort((port) => dispatch(setExpressPort(port)))
    const portsUnsubscribe = window.api.onReceivePortlist((list) => dispatch(setPorts(list)))

    return () => {
      urlUnsubscribe()
      portsUnsubscribe()
    }
  }, [dispatch])

  return (
    <>
      <Area />
    </>
  )
}

export default App
