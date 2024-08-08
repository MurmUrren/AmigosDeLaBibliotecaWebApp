import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './Pagination.css';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    className
  } = props;

  const [siblingCount, setSiblingCount] = useState(1);

  useEffect(() => {
    const updateSiblingCount = () => {
      if (window.innerWidth < 480) {
        setSiblingCount(0);
      } else if (window.innerWidth < 768) {
        setSiblingCount(1);
      } else {
        setSiblingCount(2);
      }
    };

    window.addEventListener('resize', updateSiblingCount);
    updateSiblingCount();

    return () => window.removeEventListener('resize', updateSiblingCount);
  }, []);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
