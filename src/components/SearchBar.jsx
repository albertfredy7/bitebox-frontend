import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch = () => {} }) {
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Trigger the search after a short delay
    setTimeout(() => {
      onSearch(searchQuery)
    }, 300)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-1/2 items-center space-x-2">
      <div className="relative flex-grow">
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-primary"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  )
}