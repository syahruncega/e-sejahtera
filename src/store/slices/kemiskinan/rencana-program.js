import axiosService from 'utils/axios';

const ENDPOINT = 'rencanaprogram';

export async function getRencanaProgram({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getRencanaProgramById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createRencanaProgram(newRencanaProgram) {
  console.log(newRencanaProgram);
  const response = await axiosService.post(`/${ENDPOINT}`, newRencanaProgram);
  return response.data;
}

export async function updateRencanaProgram(id, newRencanaProgram) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newRencanaProgram);
  return response.data;
}

export async function deleteRencanaProgram(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
