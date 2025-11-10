import { CellContext } from '@tanstack/react-table'

import { Case } from '@renderer/components/DataTable/makeData'

const bgMap = {
  Canceled: 'bg-canceled-bg text-canceled text-caption rounded-[22px]',
  Process: 'bg-process-bg text-process text-caption rounded-[22px]',
  Resolved: 'bg-resolved-bg text-resolved text-caption rounded-[22px]'
}

const Status = ({ info }: { info: CellContext<Case, string> }): React.JSX.Element => {
  let className = 'py-2 px-3 '
  className += bgMap[info.getValue()]

  return <span className={className}>{info.getValue()}</span>
}

export default Status
