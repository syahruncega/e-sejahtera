import axiosService from 'utils/axios';

const ENDPOINT = 'analis';

export async function getAnalis({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getAnalisById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createAnalis(newAnalis) {
  const response = await axiosService.post(`/${ENDPOINT}`, newAnalis);
  return response.data;
}

export async function updateAnalis(id, newAnalis) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newAnalis);
  return response.data;
}

export async function deleteAnalis(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
