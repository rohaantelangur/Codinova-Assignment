import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Table(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [input, setinput] = useState("")
  // const crypto = useSelector((state)=>state)
  // const Dispatch = useDispatch()
  
  // console.log(crypto);

  const HandleSearch = () =>{
    console.log(input);
  }


  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setCurrentPage(1); 
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const renderPaginationButtons = () => {
    const { data, isLoading } = props;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (totalItems === 0) {
      return <div>No data found.</div>;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        
        <button className={currentPage > 1?"next-active-button":"next-disable-button"} onClick={() => handlePageChange(currentPage - 1)} disabled={!(currentPage > 1)}>
          &laquo; Previous
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className={currentPage === page?"active-button":"disable-button"}
          >
            {page}
          </button>
        ))}
        
        <button className={currentPage < totalPages?"next-active-button":"next-disable-button"} onClick={() => handlePageChange(currentPage + 1)} disabled={!(currentPage < totalPages)}>
          Next &raquo;
        </button>
        
      </div>
    );
  };

  
  const renderTableRows = () => {
    const { data } = props;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = data.slice(startIndex, endIndex);

    return items.map((item, index) => (
      <tr key={index}>
        <td>
          <div className="table-td">
            {startIndex + index + 1}
            <img src={item.url || "btc.png"} alt={item.exchange_id} />
            {item.exchange_id}
          </div>
        </td>
        <td>
            <div className="table-td1">
                {numberToString(item.volume_1mth_usd)}
            </div>
        </td>
      </tr>
    ));
  };

  const numberToString = (num) => {
    const suffixes = ["million", "billion"];
    let suffixIndex = 0;
    while (num >= 1000000 && suffixIndex < suffixes.length) {
      num /= 1000000;
      suffixIndex++;
    }
    if (suffixIndex > 0) {
      return `$${num.toFixed(2)} ${suffixes[suffixIndex - 1]}`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  }

  
  return (
    <>
    <div className="search-bar">
        <img src="com-icon.png" alt="" />
        <input type="text" value={input} onChange={(e)=>setinput(e.target.value)}/>
        <img src="search-icon.png" alt="Search" onClick={HandleSearch}/>
    </div>
    <div>
      <div className="page-size">
        <label>Page Size: </label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                Exchanges
              </th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      <div >{renderPaginationButtons()}</div>
    </div>
    </>
  );
}

export default Table;
