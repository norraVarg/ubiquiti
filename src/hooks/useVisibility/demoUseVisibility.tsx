import { useRef } from 'react'
import { useVisibility } from './useVisibility'

export const DemoUseVisibility = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const visibility = useVisibility(containerRef, contentRef)

  const items = ['bg-cyan-500', 'bg-blue-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-rose-500']

  console.log('visibility', visibility)

  return (
    <div className='grid grid-rows-[1fr_auto] '>
      <h3 className='py-2'>useVisibility hook</h3>

      <div ref={containerRef} className='h-[320px] overflow-y-auto'>
        <div ref={contentRef}>
          {items.map((item) => (
            <div key={item} className={`h-[100px] ${item}`}>{item}</div>
          ))}
        </div>
      </div>
    </div >
  )
}
