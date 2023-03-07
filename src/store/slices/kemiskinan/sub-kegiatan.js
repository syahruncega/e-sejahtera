import axiosService from 'utils/axios';

const ENDPOINT = 'subkegiatan';

export async function getSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getSubKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createSubKegiatan(newSubKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newSubKegiatan);
  return response.data;
}

export async function updateSubKegiatan(id, newSubKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newSubKegiatan);
  return response.data;
}

export async function deleteSubKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
