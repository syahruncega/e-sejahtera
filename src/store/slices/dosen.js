import axiosService from 'utils/axios';

const ENDPOINT = 'dosen';

export async function getDosen({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getDosenById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createDosen(newDosen) {
  const response = await axiosService.post(`/${ENDPOINT}`, newDosen);
  return response.data;
}

export async function updateDosen(id, newDosen) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newDosen);
  return response.data;
}

export async function deleteDosen(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
