// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  lokasi: [],
  singleLokasi: null,
  relatedLokasi: []
};

const slice = createSlice({
  name: 'lokasi',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PROGRAMS
    getLokasiSuccess(state, action) {
      state.lokasi = action.payload;
    },

    // FILTER PROGRAMS
    filterLokasiSuccess(state, action) {
      state.lokasi = action.payload;
    },

    // GET PROGRAM BY ID
    getLokasiByIdSuccess(state, action) {
      state.singleLokasi = action.payload;
    },

    // GET RELATED PROGRAMS
    getRelatedLokasiSuccess(state, action) {
      state.relatedLokasi = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getLokasi(params) {
  return async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/lokasi`, { params });
      dispatch(slice.actions.getLokasiSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterLokasi(filter) {
  return async () => {
    try {
      const response = await axios.post('/api/product/filter', { filter });
      dispatch(slice.actions.filterLokasiSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLokasiById(id) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.BASE_URL_API}/lokasi`, { id });
      dispatch(slice.actions.getLokasiByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedLokasi(id) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedLokasiSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
