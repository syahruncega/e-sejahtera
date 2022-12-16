// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  subKegiatan: [],
  singleSubKegiatan: null,
  relatedKegiatan: []
};

const slice = createSlice({
  name: 'subKegiatan',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET KEGIATAN
    getSubKegiatanSuccess(state, action) {
      state.subKegiatan = action.payload;
    },

    // FILTER KEGIATAN
    filterSubKegiatanSuccess(state, action) {
      state.subKegiatan = action.payload;
    },

    // GET PROGRAM BY ID
    getSubKegiatanByIdSuccess(state, action) {
      state.singleSubKegiatan = action.payload;
    },

    // GET RELATED KEGIATAN
    getRelatedSubKegiatanSuccess(state, action) {
      state.relatedSubKegiatan = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSubKegiatan() {
  return async () => {
    try {
      const response = await axios.get('http://localhost:3500/sub_kegiatan');
      dispatch(slice.actions.getSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterSubKegiatan(filter) {
  return async () => {
    try {
      const response = await axios.post('/api/product/filter', { filter });
      dispatch(slice.actions.filterSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSubKegiatanById(id) {
  return async () => {
    try {
      const response = await axios.post('http://localhost:3500/sub_kegiatan', { id });
      dispatch(slice.actions.getSubKegiatanByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedSubKegiatan(id) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedSubKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
