import React from 'react'
import styled from 'styled-components'

const PaginateComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow-x: auto;

`
const PaginateWrapper = styled.div`
    display: flex;
    align-items: center;
    >* {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
    }
`
const Prev = styled.div`
  cursor: ${p =>p.disabled ? "not-allowed" : "pointer"};
  border: ${p => p.disabled && "1px solid #eee"};

`
const Numbers = styled.div`
    background-color: ${props => props.active ? "#bde4bd": "white"};
    cursor: pointer;

`
const Next = styled.div`
  cursor: ${p => p.disabled ? "not-allowed" : "pointer"};
  border: ${p => p.disabled && "1px solid #eee"};
`

function Pagination({total, setPage, page}) {


  const renderPageNumbers = () => {
    const numPagesToShow = 5;
    const pageNumbers = [];
  
    let startPage = Math.max(1, Math.min(page - Math.floor(numPagesToShow / 2), total - numPagesToShow + 1));
    let endPage = Math.min(total, startPage + numPagesToShow - 1);
  
    while (startPage <= endPage) {
      pageNumbers.push(startPage);
      startPage++;
    }
  
    return pageNumbers.map((pageNum) => (
      <Numbers key={pageNum} onClick={() => setPage(pageNum)} active={page === pageNum}>
        {pageNum}
      </Numbers>
    ));
  };

  return (
    <PaginateComponent>
        <PaginateWrapper>
          <Prev disabled={page === 1} onClick={() => page !== 1 && setPage(page => page - 1)}>&larr;</Prev>
            {renderPageNumbers()}
          <Next disabled={total === page} onClick={() => total !== page && setPage(page =>  page + 1)}>&rarr;</Next>
        </PaginateWrapper>
      </PaginateComponent>
  )
}

export default Pagination