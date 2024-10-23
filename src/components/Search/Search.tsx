import React, { useState, useEffect, useRef } from 'react'
import { Device } from '../../features/devices/definitions'
import { useAppSelector } from '../../hooks/storeHooks'
import { Link } from 'react-router-dom'
import { getMatchingProperty } from '../../utils/utils'
import ClearButton from '../../component-lib/CloseButton/CloseButton'
import { DeviceCard } from '../DeviceCard/DeviceCard'
import { useDebounce } from '../../hooks/useDebounce'

export interface SearchMatch {
  property: string
  value: string
}

type SearchResults = {
  device: Device,
  match: SearchMatch
}[]

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResults>([])
  const [show, setShow] = useState(false)
  const [hoveredDevice, setHoveredDevice] = useState<Device | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)
  const debouncedSearchTerm = useDebounce(searchTerm, 200)

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShow(false)
    }
  }

  const handleInputFocus = () => {
    if (searchTerm) {
      setShow(true)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if (event.target.value === '') {
      setShow(false)
    }
  }

  const onClickClearButton = () => {
    setSearchTerm('')
    setShow(false)
  }

  const onMouseDownClearButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setSearchResults([])
      setShow(false)

      return
    }

    const searchLower = debouncedSearchTerm.toLowerCase()

    const results = filteredDevices.reduce((acc, device) => {
      const match = getMatchingProperty(device, searchLower)

      if (match) {
        acc.push({ device, match })
      }

      return acc
    }, [] as SearchResults)

    setSearchResults(results)
    setShow(true)
  }, [debouncedSearchTerm, filteredDevices])

  return (
    <div ref={containerRef} className="relative w-full min-w-[320px] max-w=[440px] xs:w-[344px]">
      <svg className='absolute top-2.5 left-2 w-6 h-6 fill-web-unifi-color-neutral-8'>
        <path d="m16.853 16.146-2.847-2.844a6.25 6.25 0 1 0-.707.707l2.848 2.845a.496.496 0 0 0 .707-.002.498.498 0 0 0-.001-.706ZM4 9.25A5.256 5.256 0 0 1 9.25 4a5.256 5.256 0 0 1 5.25 5.25 5.256 5.256 0 0 1-5.25 5.25A5.256 5.256 0 0 1 4 9.25Z" />
      </svg>
      <div className='absolute top-1.5 right-1.5'>
        {searchTerm !== '' && <ClearButton onClick={onClickClearButton} onMouseDown={onMouseDownClearButton} />}
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        className="pl-10 pr-10 py-2 rounded w-full bg-web-unifi-color-neutral-2 hover:bg-web-unifi-color-neutral-3 focus:outline focus:outline-thin focus:outline-web-unifi-color-ublue-06 active:outline active:outline-thin active:outline-web-unifi-color-ublue-06"
        placeholder="Search devices by name or abbreviation"
      />
      {show && (
        <div className="absolute top-full right-0 translate-y-2 rounded-lg shadow-lg bg-web-unifi-color-neutral-0 w-full max-h-60 overflow-y-auto">
          {searchResults.map(({ device, match }, index) => (
            <Link
              to={`devices/${device.id}`}
              onMouseEnter={() => setHoveredDevice(device)}
              onMouseLeave={() => setHoveredDevice(null)}
              className="cursor-pointer flex items-center bg-web-unifi-color-neutral-0 px-3 py-1.5 h-fit transition ease-in-out duration-300 hover:bg-web-unifi-color-ublue-06 hover:bg-opacity-5 text-web-unifi-text-1 text-opacity-60 border-b border-web-unifi-color-neutral-3"
              key={index}
            >
              {highlightMatch(match.value, searchTerm)}
              {match.property === 'Product Name' && <span className='text-sm text-gray-500 text-right ml-auto'>{device.product.abbrev}</span>}
              {match.property === 'Product Abbreviation' && <span className='text-sm text-gray-500 text-right ml-auto'>{device.product.name}</span>}
            </Link>
          ))}
          {searchResults.length === 0 && <span className='flex items-center bg-web-unifi-color-neutral-0 px-2 py-1 h-fit text-web-unifi-text-1 text-opacity-60'>No devices found</span>}
        </div>
      )}
      {show && hoveredDevice && searchResults.length !== 0 &&
        <div className='hidden sm:block absolute left-full translate-y-2 translate-x-4 shadow rounded-lg bg-web-unifi-color-neutral-0 w-48'>
          <DeviceCard device={hoveredDevice} />
        </div>}
    </div>
  )
}

const highlightMatch = (text: string, term: string) => {
  const parts = text.split(new RegExp(`(${term})`, 'gi'))
  return (
    <span className='text-web-unifi-text-2' >
      {
        parts.map((part, index) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={index} className="font-bold underline" >
              {part}
            </span>
          ) : (
            part
          )
        )}
    </span>
  )
}