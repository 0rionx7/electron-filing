import { useMemo, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { makeData, Case } from '@renderer/components/DataTable/makeData'
import SearchTable from '@renderer/components/DataTable/SearchTable'
import Status from '@renderer/components/DataTable/Status'
import Actions from '@renderer/components/DataTable/Actions'

const defaultColumns: ColumnDef<Case, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'Case id',
    cell: (info) => <div className="p-4">{info.getValue() as string}</div>,
    size: 100
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: (info) => info.getValue(),
    size: 200
  },
  {
    accessorKey: 'lastName',
    cell: (info) => info.getValue(),
    size: 200
  },
  {
    accessorKey: 'date',
    cell: (info) => (info.getValue() as Date).toLocaleDateString('el-GR'),
    size: 100
  },
  {
    accessorKey: 'amount',
    cell: (info) => info.getValue(),
    size: 100
  },
  {
    accessorKey: 'region',
    cell: (info) => info.getValue(),
    size: 200
  },
  {
    accessorKey: 'status',
    cell: (info) => <Status info={info} />,
    size: 100
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => <Actions />,
    size: 100
  }
]

export default function DataTable(): React.JSX.Element {
  const columns = useMemo<ColumnDef<Case, unknown>[]>(() => defaultColumns, [])
  const [columnFilters, setColumnFilters] = useState([])

  const [data] = useState<Case[]>(() => makeData(300))

  const table = useReactTable<Case>({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const advancePage = (adv: number): void => {
    const current = table.getState().pagination.pageIndex
    const next = Math.min(current + adv, table.getPageCount() - 1)
    table.setPageIndex(next)
  }

  return (
    <div className="w-full h-[80vh] p-2 flex flex-col font-inter">
      <SearchTable table={table} />
      <Table className="bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-0!">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`capitalize text-left`}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div
                      className={`flex items-center gap-1 ${
                        header.column.id === 'status' ? 'justify-center' : ''
                      }`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {['firstName', 'lastName', 'date', 'status'].includes(header.column.id) && (
                        <span className="material-symbols-outlined text-black text-caption-sm!">
                          {header.column.getIsSorted() === 'asc'
                            ? 'arrow_upward'
                            : header.column.getIsSorted() === 'desc'
                              ? 'arrow_downward'
                              : 'swap_vert'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, i) => {
            const className = i % 2 === 0 ? ' bg-odd-row' : ' bg-even-row'

            return (
              <TableRow key={row.id} className={`${className} leading-base border-0`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`h-[57px] ${cell.column.id === 'status' ? 'text-center' : ''}`}
                      style={{ width: cell.column.getSize() }}
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
      <div className="width-full p-4 bg-even-row flex items-center justify-center">
        <div className="flex gap-3 items-center">
          <button
            className=" text-light-grey flex items-center"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="material-symbols-outlined text-lg! leading-none">skip_previous</span>
          </button>
          <button
            className="text-caption text-light-grey"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button className="rounded-lg p-1 bg-edit w-8 h-8 text-white">
            {table.getState().pagination.pageIndex + 1}
          </button>
          {table.getPageCount() >= table.getState().pagination.pageIndex + 2 && (
            <button
              className="rounded-lg p-1 bg-grey-btn w-8 h-8 text-black"
              onClick={() => advancePage(1)}
              disabled={!table.getCanNextPage()}
            >
              {table.getState().pagination.pageIndex + 2}
            </button>
          )}
          {table.getPageCount() >= table.getState().pagination.pageIndex + 3 && (
            <button
              className="rounded-lg p-1 bg-grey-btn w-8 h-8 text-black"
              onClick={() => advancePage(2)}
              disabled={!table.getCanNextPage()}
            >
              {table.getState().pagination.pageIndex + 3}
            </button>
          )}
          <button
            className="text-caption text-light-grey"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <button
            className=" text-light-grey flex items-center"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="material-symbols-outlined text-lg! leading-none">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  )
}
