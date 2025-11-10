import { Case } from '@renderer/components/DataTable/makeData'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent } from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Table } from '@tanstack/react-table'

const SearchTable = ({ table }: { table: Table<Case> }): React.JSX.Element => {
  return (
    <Card className="w-full bg-even-row p-0 rounded-none border-0">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-caption">Show</span>
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

            <span className="text-caption-sm">entries</span>
          </div>
          <div className="relative w-[340px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-light-grey pointer-events-none">
              search
            </span>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 rounded-md placeholder:text-caption placeholder:text-light-grey"
              value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
              onChange={(e) => table.getColumn('firstName')?.setFilterValue(e.target.value)}
            />
          </div>
        </div>
        <Button className="bg-edit rounded-lg text-caption font-bold text-white">Add case</Button>
      </CardContent>
    </Card>
  )
}

export default SearchTable
