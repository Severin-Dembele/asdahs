import React, { useState } from 'react';
import { Pagination } from 'flowbite-react';


function PaginatedTable({ data, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };


  return (
    <div className='flex items-center justify-center text-center'>
      <Pagination
        currentPage={currentPage}
        layout="pagination"
        nextLabel="Previous"
        onPageChange={page => { handlePageChange(page) }}
        previousLabel="Next"
        showIcons
        totalPages={totalPages}
      />
    </div>
  );
}

export default PaginatedTable;
