import { Table } from '@tanstack/react-table'

import { TableCell, TableRow } from '@renderer/components/ui/table'
import { Case } from '@renderer/components/DataTable/makeData'
import { cn } from '@renderer/lib/utils'
import Actions from '@renderer/components/DataTable/Actions'

const DataRows = ({ table }: { table: Table<Case> }): React.JSX.Element => {
  const rows = table.getCoreRowModel().rows.map((row) => row.original)
  const filters = table.getState().columnFilters

  const visibleRows: Case[] = !filters.length ? rows : []

  filters.forEach((filter) => {
    const filtered = rows.filter((row) =>
      (filter.value as string[]).some((v) => v === row[filter.id])
    )
    visibleRows.push(...filtered)
  })

  const leafColumns = table.getAllLeafColumns()

  return (
    <>
      {visibleRows.map((dataRow, rowIndex) => (
        <TableRow key={rowIndex} className="odd:bg-odd-row even:bg-even-row leading-base border-0">
          {leafColumns.map((col, colIndex) => {
            return (
              <TableCell
                key={`${rowIndex}-${col.id ?? colIndex}`}
                className={cn(
                  'h-[57px]',
                  col.id === 'status' ? 'text-center' : '',
                  'first:pl-4 last:pr-4',
                  'text-overflow:ellipsis',
                  'truncate'
                )}
              >
                {col.id !== 'actions' && col.id !== 'date' && dataRow[col.id]}
                {col.id === 'actions' && <Actions />}
                {col.id === 'date' && dataRow[col.id].toLocaleDateString('el-GR')}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}

export default DataRows
