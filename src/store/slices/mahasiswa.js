import axiosService from 'utils/axios';

const ENDPOINT = 'mahasiswa';

export async function getMahasiswa({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getMahasiswaById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createMahasiswa(newMahasiswa) {
  const response = await axiosService.post(`/${ENDPOINT}`, newMahasiswa);
  return response.data;
}

export async function updateMahasiswa(id, newMahasiswa) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newMahasiswa);
  return response.data;
}

export async function deleteMahasiswa(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
