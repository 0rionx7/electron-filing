import { Button } from '@renderer/components/ui/button'

const Actions = (): React.JSX.Element => {
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
      >
        <span className="material-symbols-outlined text-lg! leading-none">delete</span>
      </Button>
    </div>
  )
}

export default Actions
