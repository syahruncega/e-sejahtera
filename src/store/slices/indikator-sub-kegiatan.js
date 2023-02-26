import axiosService from 'utils/axios';

const ENDPOINT = 'indikatorsubkegiatan';

export async function getIndikatorSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getIndikatorSubKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createIndikatorSubKegiatan(newIndikatorSubKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newIndikatorSubKegiatan);
  return response.data;
}

export async function updateIndikatorSubKegiatan(id, newIndikatorSubKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newIndikatorSubKegiatan);
  return response.data;
}

export async function deleteIndikatorSubKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
