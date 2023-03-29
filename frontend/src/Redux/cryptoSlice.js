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
export const fetchCryto = createAsyncThunk("crypto/fetch", async ({page,limit,oredr,exchange_id}) => {
  const res = await fetch(`http://localhost:8080/v1/exchange-list?page=${page || 1}&limit=${limit||10}&exchange_id=${exchange_id || ""}&order=${oredr||"desc"}`);
  const data = await res.json();
  return data.data;
});