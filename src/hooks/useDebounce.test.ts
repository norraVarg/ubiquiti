import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from './useDebounce'
import { act, renderHook } from '@testing-library/react'

vi.useFakeTimers()

describe('useDebounce', () => {
  it('should debounce the value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    expect(result.current).toBe('initial')

    act(() => {
      rerender({ value: 'updated', delay: 500 })
    })

    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated')
  })

  it('should reset the debounce timer if value changes within the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    expect(result.current).toBe('initial')

    act(() => {
      rerender({ value: 'updated1', delay: 500 })
    })

    expect(result.current).toBe('initial')

    act(() => {
      rerender({ value: 'updated2', delay: 500 })
    })

    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated2')
  })
})