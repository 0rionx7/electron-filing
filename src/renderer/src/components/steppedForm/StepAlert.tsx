import { Dispatch, SetStateAction } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@renderer/components/ui/alert-dialog'

type AlertProps = { isOpen: boolean; setOpenAlert: Dispatch<SetStateAction<boolean>> }

const StepAlert = ({ isOpen, setOpenAlert }: AlertProps): React.JSX.Element => {
  const handleClose = (): void => {
    setOpenAlert(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Can't go to this step`}</AlertDialogTitle>
          <AlertDialogDescription>
            You have to complete previous steps first.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Got it!</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default StepAlert
