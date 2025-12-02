'use client';

import { DoubleRightArrowIcon, RightArrowIcon } from '../icons-generated';

interface PaginationProps {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const PAGE_GROUP_SIZE = 5;

  const startPage =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const arrowButtonClass =
    'flex-center size-8 p-1 rounded-4 text-gray-700 transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer';

  const numberButtonClass =
    'flex-center size-8 rounded-4 border border-transparent bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 cursor-pointer';

  const activeButtonClass = 'border !border-gray-400 text-gray-800';

  return (
    <nav className='flex-center gap-x-2' aria-label='Pagination'>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={arrowButtonClass}
        aria-label='First page'
      >
        <DoubleRightArrowIcon className='size-6 rotate-180' />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowButtonClass}
        aria-label='Previous page'
      >
        <RightArrowIcon className='size-6 rotate-180' />
      </button>

      <div className='flex items-center gap-1'>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={` ${numberButtonClass} ${currentPage === page ? activeButtonClass : ''} `}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowButtonClass}
        aria-label='Next page'
      >
        <RightArrowIcon className='size-6' />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={arrowButtonClass}
        aria-label='Last page'
      >
        <DoubleRightArrowIcon className='size-6' />
      </button>
    </nav>
  );
};

export default Pagination;
