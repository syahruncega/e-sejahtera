import axiosService from 'utils/axios';

const ENDPOINT = 'indikatorprogram';

export async function getIndikatorProgram({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getIndikatorProgramById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createIndikatorProgram(newIndikatorProgram) {
  const response = await axiosService.post(`/${ENDPOINT}`, newIndikatorProgram);
  return response.data;
}

export async function updateIndikatorProgram(id, newIndikatorProgram) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newIndikatorProgram);
  return response.data;
}

export async function deleteIndikatorProgram(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
