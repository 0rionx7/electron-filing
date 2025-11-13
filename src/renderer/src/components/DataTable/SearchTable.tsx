import { Case } from '@renderer/components/DataTable/makeData'
import { Button } from '@renderer/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@renderer/components/ui/input-group'
import { Table } from '@tanstack/react-table'

const SearchTable = ({ table }: { table: Table<Case> }): React.JSX.Element => {
  return (
    <div className="flex items-center justify-between py-4 px-0">
      <InputGroup className=" w-[340px]">
        <InputGroupInput
          type="search"
          placeholder="Search..."
          className="placeholder:text-caption placeholder:text-light-grey"
          value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('firstName')?.setFilterValue(e.target.value)}
        />
        <InputGroupAddon>
          <span className="material-symbols-outlined text-[20px] text-light-grey">search</span>
        </InputGroupAddon>
      </InputGroup>
      <Button className="bg-edit rounded-lg text-caption font-bold text-white">Add case</Button>
    </div>
  )
}

export default SearchTable
