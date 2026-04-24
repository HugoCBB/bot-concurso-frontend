'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const ChevronLeftIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(page))
      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  function navigate(page: number) {
    if (page < 1 || page > totalPages) return
    router.push(createPageURL(page))
  }

  return (
    <nav
      className="flex items-center justify-center gap-3 py-10"
      aria-label="Paginação"
    >
      <button
        id="pagination-prev"
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon />
        Anterior
      </button>

      <span className="text-sm font-medium text-gray-700 min-w-max">
        Página{' '}
        <strong className="text-gray-900">{currentPage}</strong>
        {' '}de{' '}
        <strong className="text-gray-900">{totalPages}</strong>
      </span>

      <button
        id="pagination-next"
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
        <ChevronRightIcon />
      </button>
    </nav>
  )
}
