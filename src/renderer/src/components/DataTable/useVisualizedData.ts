import { useEffect, useMemo, useState } from 'react'

import { Case } from '@renderer/components/DataTable/makeData'

type VDataType = { vData: Case[]; offsetY: number; totalHeight: number }

const useVizualizedData = ({ data, element }): VDataType => {
  const [range, setRange] = useState({ start: 0, end: 13 })

  useEffect(() => {
    if (!element) return

    const updateRange = (): void => {
      const scrollTop = element.scrollTop
      const containerHeight = element.clientHeight
      const start = Math.floor(scrollTop / 57)
      const end = start + Math.ceil(containerHeight / 57)

      setRange({
        start: Math.max(0, start),
        end: Math.min(data.length, end)
      })
    }

    element.addEventListener('scroll', updateRange)
    window.addEventListener('resize', updateRange)

    return () => {
      element.removeEventListener('scroll', updateRange)
      window.removeEventListener('resize', updateRange)
    }
  }, [data.length, element])

  const offsetY = range.start * 57
  const totalHeight = data.length * 57
  const vData = useMemo(() => data.slice(range.start, range.end), [data, range.start, range.end])

  return { vData, offsetY, totalHeight }
}

export default useVizualizedData
