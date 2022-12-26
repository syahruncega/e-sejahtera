import axiosService from 'utils/axios';

export async function getDetailSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/detail-sub-kegiatans`, {
    signal,
    params
  });
  return response.data;
}

export async function getDetailSubKegiatanById(id) {
  const response = await axiosService.get(`/detail-sub-kegiatans/${id}`);
  return response.data;
}
