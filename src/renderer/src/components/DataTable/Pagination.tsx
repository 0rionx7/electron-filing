import { Table } from '@tanstack/react-table'

import { Case } from '@renderer/components/DataTable/makeData'
import { Button } from '@renderer/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

const Pagination = ({ table }: { table: Table<Case> }): React.JSX.Element => {
  const advancePage = (adv: number): void => {
    const current = table.getState().pagination.pageIndex
    const next = Math.min(current + adv, table.getPageCount() - 1)
    table.setPageIndex(next)
  }
  return (
    <>
      <div className="flex items-center gap-3 ">
        <span className="text-caption  text-light-grey">Show</span>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-8 w-18 rounded-lg bg-grey-btn text-black text-center text-caption">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-caption  text-light-grey">
          of {table.getFilteredRowModel().rows.length}
        </span>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          className=" text-light-grey flex items-center"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="material-symbols-outlined text-lg! leading-none">skip_previous</span>
        </Button>
        <Button
          variant="ghost"
          className="text-caption text-light-grey"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button variant="outline">{table.getState().pagination.pageIndex + 1}</Button>
        {table.getPageCount() >= table.getState().pagination.pageIndex + 2 && (
          <Button variant="ghost" onClick={() => advancePage(1)} disabled={!table.getCanNextPage()}>
            {table.getState().pagination.pageIndex + 2}
          </Button>
        )}
        {table.getPageCount() >= table.getState().pagination.pageIndex + 3 && (
          <Button variant="ghost" onClick={() => advancePage(2)} disabled={!table.getCanNextPage()}>
            {table.getState().pagination.pageIndex + 3}
          </Button>
        )}
        <Button
          variant="ghost"
          className="text-caption text-light-grey"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="ghost"
          className=" text-light-grey flex items-center"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="material-symbols-outlined text-lg! leading-none">skip_next</span>
        </Button>
      </div>
    </>
  )
}

export default Pagination
