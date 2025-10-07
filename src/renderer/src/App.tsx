import { useAppSelector } from '@renderer/app/hooks'
import AccountDetails from '@renderer/components/AccountDetails'
import { ChooseFiles } from '@renderer/components/ChooseFiles'
import FolderSelection from '@renderer/components/FolderSelection'
import PersonalInfo from '@renderer/components/PersonalInfo'
import Success from '@renderer/components/Success'
import { selectStep, StepMap } from '@renderer/slice/slice'

function App(): React.JSX.Element {
  const step = useAppSelector(selectStep)

  return (
    <>
      {step === 1 && <AccountDetails title={StepMap[1]} />}
      {step === 2 && <PersonalInfo title={StepMap[2]} />}
      {step === 3 && <FolderSelection />}
      {step === 4 && <ChooseFiles />}
      {step === 5 && <Success />}
    </>
  )
}

export default App
