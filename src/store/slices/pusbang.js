import axiosService from 'utils/axios';

const ENDPOINT = 'pusbang';

export async function getPusbang({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getPusbangById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createPusbang(newPusbang) {
  const response = await axiosService.post(`/${ENDPOINT}`, newPusbang);
  return response.data;
}

export async function updatePusbang(id, newPusbang) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newPusbang);
  return response.data;
}

export async function deletePusbang(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
