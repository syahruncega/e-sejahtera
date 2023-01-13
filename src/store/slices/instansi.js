import axiosService from 'utils/axios';

const ENDPOINT = 'instansi';

export async function getInstansi({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}relasi`, { signal, params });
  console.log(response.data);
  return response.data;
}

export async function getInstansiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createInstansi(newInstansi) {
  const response = await axiosService.post(`/${ENDPOINT}`, newInstansi);
  return response.data;
}

export async function updateInstansi(id, newInstansi) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newInstansi);
  return response.data;
}

export async function deleteInstansi(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
