import { useMemo, useState } from 'react'
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { cn } from '@renderer/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '@renderer/components/ui/card'
import { Case, cases } from '@renderer/components/DataTable/makeData'
import FilterColumn from '@renderer/components/DataTable/filter/FilterColumn'
import SearchTable from '@renderer/components/DataTable/SearchTable'
import Pagination from '@renderer/components/DataTable/Pagination'
import Actions from '@renderer/components/DataTable/Actions'
import Status from '@renderer/components/DataTable/Status'

const defaultColumns: ColumnDef<Case, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'Case id',
    cell: (info) => <div className="p-4">{info.getValue() as string}</div>,
    size: 70,
    enableSorting: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: (info) => info.getValue(),
    size: 200,
    filterFn: 'startsWith'
  },
  {
    accessorKey: 'lastName',
    cell: (info) => info.getValue(),
    size: 200,
    filterFn: 'startsWith'
  },
  {
    accessorKey: 'date',
    cell: (info) => (info.getValue() as Date).toLocaleDateString('el-GR'),
    size: 100,
    filterFn: 'dateRange',
    meta: { filterVariant: 'date' }
  },
  {
    accessorKey: 'amount',
    cell: (info) => info.getValue(),
    size: 100,
    enableSorting: false,
    meta: { filterVariant: 'range' }
  },
  {
    accessorKey: 'region',
    cell: (info) => info.getValue(),
    size: 200,
    filterFn: 'startsWith'
  },
  {
    accessorKey: 'status',
    cell: (info) => <Status info={info} />,
    size: 100,
    filterFn: 'startsWith'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (info) => <Actions info={info} />,
    size: 100
  }
]

export const startsWithFilter: FilterFn<Case> = (row, columnId, filterValue: string[]) => {
  const cellValue = String(row.getValue(columnId) ?? '').toLowerCase()
  if (!filterValue.length) return true
  return filterValue.some((f) => cellValue === f.toLowerCase())
}

export const dateFilter: FilterFn<Case> = (row, columnId, filterValue) => {
  const rowDate = new Date(row.getValue(columnId))
  const [min, max] = filterValue || []

  if (!min && !max) return true
  if (min && rowDate < new Date(min)) return false
  if (max && rowDate > new Date(max)) return false
  return true
}

export default function DataTable(): React.JSX.Element {
  const columns = useMemo<ColumnDef<Case, unknown>[]>(() => defaultColumns, [])
  const [data] = useState<Case[]>(cases)

  const table = useReactTable<Case>({
    data,
    columns,
    columnResizeMode: 'onChange',
    filterFns: { startsWith: startsWithFilter, dateRange: dateFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  })

  return (
    <Card className="gap-1">
      <CardHeader>
        <SearchTable table={table} />
      </CardHeader>
      <CardContent className="h-[71vh] gap-0 overflow-auto">
        <Table className="w-[80vw] bg-white table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-0!">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'capitalize text-left px-2 pb-1 first:pl-4 last:pr-4',
                        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        header.column.id === 'status' ? 'text-center' : ''
                      )}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center justify-between relative">
                        <div
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                          className="flex items-center cursor-pointer select-none"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span className="material-symbols-outlined text-black text-caption-sm! ml-2">
                              {{ asc: 'arrow_upward', desc: 'arrow_downward' }[
                                header.column.getIsSorted() as string
                              ] ?? 'swap_vert'}
                            </span>
                          )}
                        </div>
                        {header.column.getCanFilter() && <FilterColumn column={header.column} />}
                        <div
                          onDoubleClick={() => header.column.resetSize()}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'absolute right-0 top-0 h-full w-1 bg-light-grey cursor-e-resize opacity-0 hover:opacity-100 select-none touch-none',
                            header.column.getIsResizing() ? 'bg-indigo-600 opacity-100' : ''
                          )}
                          style={{
                            transform:
                              table.options.columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                                    (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                  }px)`
                                : ''
                          }}
                        />
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className={`odd:bg-odd-row even:bg-even-row leading-base border-0`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'h-[57px]',
                          cell.column.id === 'status' ? 'text-center' : '',
                          'first:pl-4 last:pr-4',
                          'text-overflow:ellipsis',
                          'truncate'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between">
        <Pagination table={table} />
      </CardFooter>
    </Card>
  )
}
