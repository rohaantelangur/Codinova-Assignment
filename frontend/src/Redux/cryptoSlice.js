import { useDispatch } from "react-redux";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const crytoSlice = createSlice({
  name: "cryto",
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {
    getDataRequest: state => {
      state.loading = true
      state.error = false
    },
    getDataSeccess: state => {
      state.loading = false
      state.data = []
      state.error = false
    },
    getDataFailed: state => {
      state.data = []
      state.loading = false
      state.error = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryto.pending, (state, action) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchCryto.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false
        state.error = false
      })
      .addCase(fetchCryto.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  },
});

export default crytoSlice.reducer;

// Fetch all data
export const fetchCryto = createAsyncThunk("crypto/fetch", async (url) => {
  const res = await fetch("http://localhost:8080/v1/exchange-list?page=1&limit=50&exchange_id=btc&order=asc");
  const data = await res.json();
  return data.data;
});