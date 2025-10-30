import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  selectFirstStepData,
  selectRootDirectory,
  selectSecondStepData,
  setStep
} from '@renderer/slices/registerSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'

const isStepCompleted = (data: Record<string, string>): boolean =>
  Object.values(data).every(Boolean)

const useGotoStep = (): { openAlert: boolean; setOpenAlert: Dispatch<SetStateAction<boolean>> } => {
  const firstStepData = useAppSelector(selectFirstStepData)
  const secondStepData = useAppSelector(selectSecondStepData)
  const rootDirectory = useAppSelector(selectRootDirectory)
  const [openAlert, setOpenAlert] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = window.api.gotoStep((step) => {
      const firstStepCompleted = isStepCompleted(firstStepData)
      const secondStepCompleted = isStepCompleted(secondStepData)
      const infosCompleted = firstStepCompleted && secondStepCompleted

      const shouldOpenDialog =
        (step === 2 && !firstStepCompleted) ||
        (step == 3 && !infosCompleted) ||
        (step === 4 && (!infosCompleted || !rootDirectory))
      if (shouldOpenDialog) setOpenAlert(true)
      else dispatch(setStep(step))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch, rootDirectory, firstStepData, secondStepData])

  return { openAlert, setOpenAlert }
}

export default useGotoStep
