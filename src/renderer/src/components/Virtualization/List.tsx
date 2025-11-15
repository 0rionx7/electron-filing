import { useEffect, useRef, useState } from 'react'

import { Place } from '@renderer/components/Virtualization/makeData'

const List = ({ places }: { places: Place[] }): React.JSX.Element => {
  const [range, setRange] = useState({ start: 0, end: 20 })
  const [itemHeight, setItemHeight] = useState<number | null>(null)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const itemRef = (el: HTMLLIElement | null): void => {
    if (el && itemHeight === null) {
      const height = el.offsetHeight
      setItemHeight(height)
    }
  }

  useEffect(() => {
    if (!itemHeight) return

    const el = scrollContainerRef.current
    if (!el) return

    const updateRange = (): void => {
      const scrollTop = el.scrollTop
      const containerHeight = el.clientHeight

      const start = Math.floor(scrollTop / itemHeight)
      const end = start + Math.ceil(containerHeight / itemHeight)

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
  }, [itemHeight, places.length])

  const visible = places.slice(
    Math.max(0, range.start - 10),
    Math.min(places.length, range.end + 10)
  )
  const offsetY = Math.max(0, range.start - 10) * (itemHeight ?? 0)
  const totalHeight = places.length * (itemHeight ?? 0)

  return (
    <div ref={scrollContainerRef} className="h-full overflow-auto">
      <ul className="relative w-full" style={{ height: totalHeight }}>
        <div
          className="absolute left-0 top-0 w-full"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visible.map((pl, i) => (
            <li ref={i === 0 ? itemRef : null} key={pl.name + i} className="px-2 h-8">
              {pl.name}
              {i}
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}

export default List
