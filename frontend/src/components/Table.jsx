import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCryto } from "../Redux/cryptoSlice";

function Table(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [Order, setOrder] = useState("desc");
  const [input, setinput] = useState("");
  const Dispatch = useDispatch();

  const HandleSearch = () => {
    console.log(input);
    setOrder("desc");
    setPageSize(10);
    setCurrentPage(1);
    setinput("");
    Dispatch(fetchCryto({ exchange_id: input }));
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    Dispatch(fetchCryto({ limit: size }));
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    Dispatch(fetchCryto({ page, limit: pageSize }));
  };

  const handleOrderChange = (e) => {
    const oredr = e.target.value;
    setOrder(oredr);
    Dispatch(fetchCryto({ oredr, limit: pageSize }));
  };

  const handleReset = () => {
    setOrder("desc");
    setPageSize(10);
    setCurrentPage(1);
    setinput("");
    Dispatch(fetchCryto({}));
  };

  const renderPaginationButtons = () => {
    const { data, isLoading, isError } = props;
    const totalItems = data.length;
    const totalPages = 10;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error...!</div>;
    }

    if (totalItems === 0) {
      return <div>No data found.</div>;
    }

    const pages = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0) pages.push(i);
    }

    return (
      <div className="pagination">
        <button
          className={
            currentPage > 1 ? "next-active-button" : "next-disable-button"
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!(currentPage > 1)}
        >
          &laquo; Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className={
              currentPage === page ? "active-button" : "disable-button"
            }
          >
            {page}
          </button>
        ))}

        <button
          className={
            currentPage < totalPages
              ? "next-active-button"
              : "next-disable-button"
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!(currentPage < totalPages)}
        >
          Next &raquo;
        </button>
      </div>
    );
  };

  const renderTableRows = () => {
    const { data } = props;
    const startIndex = (currentPage - 1) * pageSize;
    const items = data;

    return items.map((item, index) => (
      <div className="table-row" key={index}>
        <div className="table-td">
          {startIndex + index + 1}
          <img src={item.url || "btc.png"} alt={item.exchange_id} />
          {item.exchange_id}
        </div>
        <div className="table-td">{numberToString(item?.volume_1day_usd)}</div>
      </div>
    ));
  };

  const numberToString = (num) => {
    const suffixes = ["million", "billion","tillion"];
    let suffixIndex = 0;
    while (num >= 1000000 && suffixIndex < suffixes.length) {
      num /= 1000000;
      suffixIndex++;
    }
    if (suffixIndex > 0) {
      return `$${num.toFixed(2)} ${suffixes[suffixIndex - 1]}`;
    } else {
      console.log(num);
      return `$${num.toFixed(2)}`;
      // return `$${num}`;
    }
  };

  return (
    <>
      <div className="search-bar">
        <img src="com-icon.png" alt="" />
        <input
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <img src="search-icon.png" alt="Search" onClick={HandleSearch} />
      </div>
      <div>
        <div className="page-size">
          <button onClick={handleReset}>Reset</button>
          <label>Page Size: </label>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <label>Order: </label>
          <select value={Order} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending </option>
          </select>
        </div>

        <div className="tabel-div">
          <div className="table-header">
            <div>Exchanges</div>
            <div>24H Change</div>
          </div>
          <div className="table-body">{renderTableRows()}</div>
        </div>
        <div>{renderPaginationButtons()}</div>
      </div>
    </>
  );
}

export default Table;
