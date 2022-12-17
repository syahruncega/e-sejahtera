// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import programReducer from './slices/program';
import kegiatanReducer from './slices/kegiatan';
import subKegiatanReducer from './slices/sub-kegiatan';
import detailSubKegiatanReducer from './slices/detail-sub-kegiatan';
import lokasiReducer from './slices/lokasi';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: menuReducer,
  program: programReducer,
  kegiatan: kegiatanReducer,
  subKegiatan: subKegiatanReducer,
  detailSubKegiatan: detailSubKegiatanReducer,
  lokasi: lokasiReducer
});

export default reducer;
