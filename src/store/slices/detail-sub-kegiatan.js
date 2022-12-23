import axiosService from 'utils/axios';

export async function getDetailSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/detail_sub_kegiatans`, {
    signal,
    params
  });
  return response.data;
}

export async function getDetailSubKegiatanById(id) {
  const response = await axiosService.get(`/detail_sub_kegiatans/${id}`);
  return response.data;
}
