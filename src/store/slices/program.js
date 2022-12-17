// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  program: [],
  singleProgram: null,
  relatedProgram: []
};

const slice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PROGRAMS
    getProgramSuccess(state, action) {
      state.program = action.payload;
    },

    // FILTER PROGRAMS
    filterProgramSuccess(state, action) {
      state.program = action.payload;
    },

    // GET PROGRAM BY ID
    getProgramByIdSuccess(state, action) {
      state.singleProgram = action.payload;
    },

    // GET RELATED PROGRAMS
    getRelatedProgramSuccess(state, action) {
      state.relatedProgram = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProgram() {
  return async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/program`);
      dispatch(slice.actions.getProgramSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterProgram(filter) {
  return async () => {
    try {
      const response = await axios.post('/api/product/filter', { filter });
      dispatch(slice.actions.filterProgramSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProgramById(id) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/program`, { id });
      dispatch(slice.actions.getProgramByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedProgram(id) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedProgramSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
