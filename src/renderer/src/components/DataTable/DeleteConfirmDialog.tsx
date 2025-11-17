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
    <>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
        </Dialog>
      )}
    </>
  )
}

export default DeleteConfirmDialog
