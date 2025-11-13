import { useEffect, useRef, useState } from 'react'

import { Place } from '@renderer/components/Virtualization/makeData'

const List = ({ places }: { places: Place[] }): React.JSX.Element => {
  const [range, setRange] = useState({ start: 0, end: 20 })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateRange = (): void => {
      const scrollTop = el.scrollTop
      const containerHeight = el.clientHeight
      const start = Math.floor(scrollTop / 32)
      const end = start + Math.ceil(containerHeight / 32)

      setRange({
        start: Math.max(0, start),
        end: Math.min(places.length, end)
      })
    }

    el.addEventListener('scroll', updateRange)
    window.addEventListener('resize', updateRange)

    return () => {
      el.removeEventListener('scroll', updateRange)
      window.removeEventListener('resize', updateRange)
    }
  }, [places.length])

  const visible = places.slice(range.start, range.end)
  const offsetY = range.start * 32
  const totalHeight = places.length * 32

  return (
    <div ref={scrollRef} className="h-full overflow-auto">
      <ul className="relative w-full" style={{ height: totalHeight }}>
        <div
          className="absolute left-0 top-0 w-full"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visible.map((pl, i) => (
            <li key={pl.name + i} className="px-2 h-8">
              {pl.name}
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}

export default List
