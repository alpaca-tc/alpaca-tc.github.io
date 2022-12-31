import Link from 'next/link'
import Router from 'next/router'
import { FunctionComponent } from 'react'

type Props = {
  currentPage: number
  totalCount: number
  per: number
  basePath: string
}

const calculateAvailablePages = (
  totalCount: number,
  perCount: number,
  currentPage: number,
  displayPage = 5,
): number[] => {
  const lastPage = Math.ceil(totalCount / perCount)
  const cover = Math.floor(displayPage / 2)
  const startPage = currentPage - cover
  const endPage = currentPage + cover
  const pages = []

  for (let page = startPage; page <= endPage; page++) {
    if (1 <= page && page <= lastPage) {
      pages.push(page)
    }
  }

  return pages
}

const Pagination: FunctionComponent<Props> = ({
  currentPage,
  totalCount,
  per,
  basePath,
}: Props) => {
  const gotoPage = (diff: number): void => {
    const nextPath = `${basePath}/${currentPage + diff}`
    Router.push(nextPath)
  }

  const lastPage = Math.floor(totalCount / per) + 1
  const availablePages = calculateAvailablePages(totalCount, per, currentPage)

  return (
    <nav aria-label="Pagination" className="max-w-md">
      <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      <a
        onClick={() => gotoPage(-1)}
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage <= 1 ? 'hidden' : ''}`}
      >
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
      </a>

        {availablePages.map((page) => (
          <Link
            href={`${basePath}/${page}`}
            key={page}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === page ? 'bg-gray-100' : ''}`}
          >
            {page}
          </Link>
        ))}

        <a
          onClick={() => gotoPage(1)}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage >= lastPage ? 'hidden' : ''}`}
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
          </svg>
        </a>
      </div>

      <p className="text-sm text-gray-700 mt-1 text-center">
        Page {currentPage} / {lastPage}
      </p>
    </nav>
  )
}

export default Pagination
