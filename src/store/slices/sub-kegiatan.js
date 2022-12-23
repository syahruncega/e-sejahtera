import axiosService from 'utils/axios';

export async function getSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/sub_kegiatans?_expand=kegiatan`, { signal, params });
  return response.data;
}

export async function getSubKegiatanById(id) {
  const response = await axiosService.get(`/sub_kegiatans/${id}?_expand=kegiatan`);
  return response.data;
}
