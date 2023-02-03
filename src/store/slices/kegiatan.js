import axiosService from 'utils/axios';

const ENDPOINT = 'kegiatan';

export async function getKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  console.log(response.data);
  return response.data;
}

export async function getKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createKegiatan(newKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newKegiatan);
  return response.data;
}

export async function updateKegiatan(id, newKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newKegiatan);
  return response.data;
}

export async function deleteKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
