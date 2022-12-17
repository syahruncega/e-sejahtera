// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  detailSubKegiatan: [],
  singleDetailSubKegiatan: null,
  relatedDetailSubKegiatan: []
};

const slice = createSlice({
  name: 'detailSubKegiatan',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PROGRAMS
    getDetailSubKegiatanSuccess(state, action) {
      state.detailSubKegiatan = action.payload;
    },

    // FILTER PROGRAMS
    filterDetailSubKegiatanSuccess(state, action) {
      state.detailSubKegiatan = action.payload;
    },

    // GET PROGRAM BY ID
    getDetailSubKegiatanByIdSuccess(state, action) {
      state.singleDetailSubKegiatan = action.payload;
    },

    // GET RELATED PROGRAMS
    getRelatedDetailSubKegiatanSuccess(state, action) {
      state.relatedDetailSubKegiatan = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDetailSubKegiatan(params) {
  return async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_sub_kegiatan`, { params });
      dispatch(slice.actions.getDetailSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterDetailSubKegiatan(filter) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_sub_kegiatan`, { filter });
      dispatch(slice.actions.filterDetailSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDetailSubKegiatanById(id) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_sub_kegiatan`, { id });
      dispatch(slice.actions.getDetailSubKegiatanByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedDetailSubKegiatan(id) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedDetailSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
