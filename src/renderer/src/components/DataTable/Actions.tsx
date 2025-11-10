import { useState } from 'react'

import { Button } from '@renderer/components/ui/button'
import DeleteConfirmDialog from '@renderer/components/DataTable/DeleteConfirmDialog'
import { CellContext } from '@tanstack/react-table'
import { Case } from '@renderer/components/DataTable/makeData'

const Actions = ({ info }: { info: CellContext<Case, unknown> }): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const handleDelete = (): void => {
    console.log(`${info.row.original.id} Deleted successfully!`)
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-[18px] w-[18px] p-0 text-edit"
        aria-label="Edit"
      >
        <span className="material-symbols-outlined text-lg! leading-none">edit_square</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-[18px] w-[18px] p-0 text-canceled"
        aria-label="Delete"
        onClick={() => setOpen(true)}
      >
        <span className="material-symbols-outlined text-lg! leading-none">delete</span>
      </Button>
      <DeleteConfirmDialog open={open} onOpenChange={setOpen} onConfirm={handleDelete} />
    </div>
  )
}

export default Actions
