import { ChooseFiles } from '@renderer/components/ChooseFiles'
import { FileSelection } from '@renderer/components/FilesSelection'
import FolderSelection from '@renderer/components/FolderSelection'

function App(): React.JSX.Element {
  return (
    <>
      <FileSelection>
        <FolderSelection />
        <ChooseFiles />
      </FileSelection>
    </>
  )
}

export default App
