import axiosService from 'utils/axios';

const ENDPOINT = 'user';

export async function getUser({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getUserById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createUser(newUser) {
  const response = await axiosService.post(`/${ENDPOINT}`, newUser);
  return response.data;
}

export async function updateUser(id, newUser) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newUser);
  return response.data;
}

export async function deleteUser(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
