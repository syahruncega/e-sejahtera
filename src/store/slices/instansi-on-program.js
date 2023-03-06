import axiosService from 'utils/axios';

const ENDPOINT = 'instansionprogram';

export async function getInstansiOnProgram({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getInstansiOnProgramById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createInstansiOnProgram(newInstansiOnProgram) {
  const response = await axiosService.post(`/${ENDPOINT}`, newInstansiOnProgram);
  return response.data;
}

export async function updateInstansiOnProgram(id, newInstansiOnProgram) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newInstansiOnProgram);
  return response.data;
}

export async function deleteInstansiOnProgram(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
