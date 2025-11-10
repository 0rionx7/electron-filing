// DeleteConfirmDialog.tsx
import { motion, AnimatePresence } from 'motion/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

const DeleteConfirmDialog = ({ open, onOpenChange, onConfirm }: Props): React.JSX.Element => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <DialogContent className="border-0 p-0">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">
                    Delete case?
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    Are you sure you want to delete this case? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-6 flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:bg-gray-100"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-canceled hover:bg-canceled/90 text-white"
                    onClick={() => {
                      onConfirm()
                      onOpenChange(false)
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default DeleteConfirmDialog
