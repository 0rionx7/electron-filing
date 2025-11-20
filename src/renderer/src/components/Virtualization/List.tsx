import { useEffect, useRef, useState } from 'react'

import { Place } from '@renderer/components/Virtualization/makeData'

const OVERSCAN_COUNT = 200

const List = ({ places }: { places: Place[] }): React.JSX.Element => {
  const [scrollState, setScrollState] = useState({
    itemHeight: null as number | null,
    scrollTop: 0,
    viewportHeight: 0
  })

  const rafIdRef = useRef<number | null>(null)

  const { itemHeight, scrollTop, viewportHeight } = scrollState

  const totalItems = places.length

  const viewportItemCount = itemHeight ? Math.floor(viewportHeight / itemHeight) : 0
  const scrollIndex = itemHeight ? Math.floor(scrollTop / itemHeight) : 0

  const startIndex = itemHeight ? Math.max(0, scrollIndex - OVERSCAN_COUNT) : 0
  const endIndex = itemHeight
    ? Math.min(totalItems, scrollIndex + viewportItemCount + OVERSCAN_COUNT)
    : 100

  const measureItemHeight = (el: HTMLLIElement | null): void => {
    if (el && itemHeight === null) {
      setScrollState((prev) => ({ ...prev, itemHeight: el.offsetHeight }))
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const target = e.currentTarget

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      setScrollState((prev) => ({
        ...prev,
        scrollTop: target.scrollTop,
        ...(prev.viewportHeight === 0 && { viewportHeight: target.clientHeight })
      }))
    })
  }

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const getVisibleItems = (): Place[] => {
    if (!itemHeight) return places.slice(0, 100)

    return places.slice(startIndex, endIndex)
  }

  const visibleItems = getVisibleItems()
  const topOffset = startIndex * (itemHeight ?? 0)
  const listHeight = places.length * (itemHeight ?? 0)

  return (
    <div onScroll={handleScroll} className="h-full overflow-auto">
      <ul className="relative w-full" style={{ height: listHeight }}>
        <div
          className="absolute left-0 top-0 w-full will-change-transform"
          style={{ transform: `translateY(${topOffset}px)` }}
        >
          {visibleItems.map((place, index) => {
            const absoluteIndex = startIndex + index
            return (
              <li
                ref={index === 0 ? measureItemHeight : null}
                key={`${place.name}-${absoluteIndex}`}
                className="px-2 h-8"
              >
                {place.name}
                {absoluteIndex}
              </li>
            )
          })}
        </div>
      </ul>
    </div>
  )
}

export default List
