import axiosService from 'utils/axios';

const ENDPOINT = 'detailsubkegiatan';

export async function getDetailSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}relasi`, { signal, params });
  return response.data;
}

export async function getDetailSubKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createDetailSubKegiatan(newDetailSubKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newDetailSubKegiatan);
  return response.data;
}

export async function updateDetailSubKegiatan(id, newDetailSubKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newDetailSubKegiatan);
  return response.data;
}

export async function deleteDetailSubKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
