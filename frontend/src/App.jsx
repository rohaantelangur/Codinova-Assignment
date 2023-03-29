import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryto } from "./Redux/cryptoSlice";

const App = () => {
  const crypto = useSelector((state)=>state)
  const Dispatch = useDispatch();
  console.log(crypto);
  
  useEffect(() => {
  Dispatch(fetchCryto({}))
  }, [])

  return (
    <>
      <Header />
      <Table data={crypto.data} isLoading={crypto.loading} isError={crypto.error}/>
    </>
  );
}

export default App;
