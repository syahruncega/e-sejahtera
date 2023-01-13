import axiosService from 'utils/axios';

const ENDPOINT = 'program';

export async function getProgram({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}relasi`, { signal, params });
  console.log(response.data);
  return response.data;
}

export async function getProgramById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createProgram(newProgram) {
  const response = await axiosService.post(`/${ENDPOINT}`, newProgram);
  return response.data;
}

export async function updateProgram(id, newProgram) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newProgram);
  return response.data;
}

export async function deleteProgram(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
