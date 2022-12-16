// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  kegiatan: [],
  singleKegiatan: null,
  relatedKegiatan: []
};

const slice = createSlice({
  name: 'kegiatan',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET KEGIATAN
    getKegiatanSuccess(state, action) {
      state.kegiatan = action.payload;
    },

    // FILTER KEGIATAN
    filterKegiatanSuccess(state, action) {
      state.kegiatan = action.payload;
    },

    // GET PROGRAM BY ID
    getKegiatanByIdSuccess(state, action) {
      state.singleKegiatan = action.payload;
    },

    // GET RELATED KEGIATAN
    getRelatedKegiatanSuccess(state, action) {
      state.relatedKegiatan = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getKegiatan() {
  return async () => {
    try {
      const response = await axios.get('http://localhost:3500/kegiatan');
      dispatch(slice.actions.getKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterPrograms(filter) {
  return async () => {
    try {
      const response = await axios.post('/api/product/filter', { filter });
      dispatch(slice.actions.filterKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getKegiatanById(id) {
  return async () => {
    try {
      const response = await axios.post('http://localhost:3500/kegiatan', { id });
      dispatch(slice.actions.getKegiatanByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedKegiatan(id) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedKegiatanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
