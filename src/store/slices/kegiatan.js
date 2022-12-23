import axiosService from 'utils/axios';

export async function getKegiatan({ signal, params }) {
  const response = await axiosService.get(`/kegiatans`, { signal, params });
  return response.data;
}

export async function getKegiatanById(id) {
  const response = await axiosService.get(`/kegiatan/${id}`);
  return response.data;
}
