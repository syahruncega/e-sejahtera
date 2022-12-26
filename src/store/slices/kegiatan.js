import axiosService from 'utils/axios';

export async function getKegiatan({ signal, params }) {
  const response = await axiosService.get(`/kegiatan`, { signal, params });
  return response.data;
}

export async function getKegiatanById(id) {
  const response = await axiosService.get(`/kegiatan/${id}`);
  return response.data;
}
