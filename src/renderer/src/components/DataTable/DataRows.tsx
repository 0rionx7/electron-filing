import { useMemo } from 'react'
import { Table } from '@tanstack/react-table'

import { TableCell, TableRow } from '@renderer/components/ui/table'
import { Case } from '@renderer/components/DataTable/makeData'
import { cn } from '@renderer/lib/utils'
import Actions from '@renderer/components/DataTable/Actions'

const DataRows = ({ table }: { table: Table<Case> }): React.JSX.Element => {
  const allRows = table.getCoreRowModel().rows.map((row) => row.original)
  const filters = table.getState().columnFilters

  // const visibleRows: Case[] = !filters.length ? allRows : []
  // console.time()
  // filters.forEach((filter) => {
  //   const filtered = allRows.filter((row) =>
  //     (filter.value as string[]).some((v) => v === row[filter.id])
  //   )
  //   visibleRows.push(...filtered)
  // })
  // console.timeEnd()

  console.time('sec')
  const filtered = useMemo(
    () =>
      allRows.filter((row) => {
        if (!filters.length) return true
        for (const filter of filters) {
          if ((filter.value as string[]).some((v) => v === row[filter.id])) return true
        }
        return false
      }),
    [allRows, filters]
  )
  console.timeEnd('sec')

  const leafColumns = table.getAllLeafColumns()

  const uniqueRows = [...new Set(filtered)]

  return (
    <>
      {uniqueRows.map((row) => (
        <TableRow
          key={row.id + row.firstName}
          className="odd:bg-odd-row even:bg-even-row leading-base border-0"
        >
          {leafColumns.map((col) => {
            return (
              <TableCell
                key={col.id}
                className={cn(
                  'h-[57px]',
                  col.id === 'status' ? 'text-center' : '',
                  'first:pl-4 last:pr-4',
                  'text-overflow:ellipsis',
                  'truncate'
                )}
              >
                {col.id === 'actions' ? (
                  <Actions />
                ) : col.id === 'date' ? (
                  row.date.toLocaleDateString('el-GR')
                ) : (
                  row[col.id]
                )}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}

export default DataRows
