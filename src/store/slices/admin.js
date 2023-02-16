import axiosService from 'utils/axios';

const ENDPOINT = 'admin';

export async function getAdmin({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getAdminById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createAdmin(newAdmin) {
  const response = await axiosService.post(`/${ENDPOINT}`, newAdmin);
  return response.data;
}

export async function updateAdmin(id, newAdmin) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newAdmin);
  return response.data;
}

export async function deleteAdmin(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
