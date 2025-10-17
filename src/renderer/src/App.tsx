import { useEffect } from 'react'

import AccountDetails from '@renderer/components/AccountDetails'
import { SelectFiles } from '@renderer/components/SelectFiles'
import SelectFolder from '@renderer/components/SelectFolder'
import PersonalInfo from '@renderer/components/PersonalInfo'
import Success from '@renderer/components/Success'
import Stepper, { Step } from '@renderer/components/Stepper'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { selectExpressUrl, setExpressUrl, setPorts } from '@renderer/slices/backendApiSlice'

function App(): React.JSX.Element {
  const expressUrl = useAppSelector(selectExpressUrl)
  const dispatch = useAppDispatch()

  const handleFetch = async (): Promise<void> => {
    const response = await fetch(expressUrl)
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    window.api.getExpressUrl((_event, url) => {
      dispatch(setExpressUrl(url))
    })
    window.api.onReceivePortlist((_event, list) => {
      dispatch(setPorts(list))
    })
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
