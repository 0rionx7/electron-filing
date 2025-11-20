import * as React from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'

type Person = {
  name: string
  email: string
  age: number
}

const data: Person[] = [
  { name: 'Alice', email: 'alice@x.com', age: 25, j: 1 },
  { name: 'Bob', email: 'bob@x.com', age: 30, j: 1 },
  { name: 'Carla', email: 'carla@x.com', age: 40, j: 1 }
]

// ------------------------------
// GLOBAL FILTER (rows[] → rows[])
// ------------------------------
const myGlobalFilter = (row, columnId, filterValue) => {
  console.log('GLOBAL FILTER row:', row.original)

  return Object.values(row.original).some((v) =>
    String(v).toLowerCase().includes(filterValue.toLowerCase())
  )
}

// ------------------------------
// COLUMN FILTER (row → boolean)
// ------------------------------
const myColumnFilter = (row, columnId, filterValue) => {
  console.log('COLUMN FILTER — single row:', row.original)

  const cell = String(row.getValue(columnId)).toLowerCase()
  return cell.includes(filterValue.toLowerCase())
}

// ------------------------------
// React Component
// ------------------------------
export default function Demo() {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState([])

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterFn: myColumnFilter // use custom column filterFn
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterFn: myColumnFilter
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterFn: myColumnFilter
      },
      {
        accessorKey: 'j',
        header: 'i',
        filterFn: myColumnFilter
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    // filterFns: { myGlobalFilter },
    globalFilterFn: myGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Global + Column FilterFn Example</h2>

      {/* GLOBAL FILTER INPUT */}
      <input
        style={{ marginBottom: 12 }}
        placeholder="Global filter..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <table border={1} cellPadding={8}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {/* COLUMN FILTER INPUT */}
                  <div>
                    <input
                      placeholder={'Filter ' + header.column.id}
                      value={header.column.getFilterValue() ?? ''}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
