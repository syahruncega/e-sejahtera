import axiosService from 'utils/axios';

const ENDPOINT = 'kegiatanonsubkegiatan';

export async function getKegiatanOnSubKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getKegiatanOnSubKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createKegiatanOnSubKegiatan(newKegiatanOnSubKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newKegiatanOnSubKegiatan);
  return response.data;
}

export async function updateKegiatanOnSubKegiatan(id, newKegiatanOnSubKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newKegiatanOnSubKegiatan);
  return response.data;
}

export async function deleteKegiatanOnSubKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
