import axiosService from 'utils/axios';

const ENDPOINT = 'programonkegiatan';

export async function getProgramOnKegiatan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getProgramOnKegiatanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createProgramOnKegiatan(newProgramOnKegiatan) {
  const response = await axiosService.post(`/${ENDPOINT}`, newProgramOnKegiatan);
  return response.data;
}

export async function updateProgramOnKegiatan(id, newProgramOnKegiatan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newProgramOnKegiatan);
  return response.data;
}

export async function deleteProgramOnKegiatan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
