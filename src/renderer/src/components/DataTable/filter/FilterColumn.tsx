import { Column } from '@tanstack/react-table'

import DateFilter from '@renderer/components/DataTable/filter/DateFilter'
import InputFilter from '@renderer/components/DataTable/filter/InputFilter'
import RangeFilter from '@renderer/components/DataTable/filter/RangeFilter'
import { Case } from '@renderer/components/DataTable/makeData'

export default function FilterColumn({
  column
}: {
  column: Column<Case, unknown>
}): React.JSX.Element {
  const { filterVariant } = column.columnDef.meta ?? {}

  if (filterVariant === 'date') return <DateFilter column={column} />

  return filterVariant === 'range' ? (
    <RangeFilter column={column} />
  ) : (
    <InputFilter column={column} />
  )
}
