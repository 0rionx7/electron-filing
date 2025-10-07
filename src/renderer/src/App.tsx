import { useAppSelector } from '@renderer/app/hooks'
import AccountDetails from '@renderer/components/AccountDetails'
import { ChooseFiles } from '@renderer/components/ChooseFiles'
import FolderSelection from '@renderer/components/FolderSelection'
import PersonalInfo from '@renderer/components/PersonalInfo'
import { selectFileList, selectStep, StepMap } from '@renderer/slice/slice'

function App(): React.JSX.Element {
  const step = useAppSelector(selectStep)
  const files = useAppSelector(selectFileList)

  return (
    <>
      {step === 1 && <AccountDetails title={StepMap[1]} />}
      {step === 2 && <PersonalInfo title={StepMap[2]} />}
      {step === 3 && <FolderSelection />}
      {step === 4 && <ChooseFiles />}
    </>
  )
}

export default App
