import React, { useState } from 'react';
import { Pagination } from 'flowbite-react';

import { useTranslation } from 'react-i18next';

function PaginatedTable({ data, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const { t } = useTranslation();

  return (
    <div className='flex items-center justify-center text-center'>
      <Pagination
        currentPage={currentPage}
        layout="pagination"
        nextLabel={`${t("next")}`}
        onPageChange={page => { handlePageChange(page) }}
        previousLabel={`${t("previous")}`}
        showIcons
        totalPages={totalPages}
      />
    </div>
  );
}

export default PaginatedTable;
