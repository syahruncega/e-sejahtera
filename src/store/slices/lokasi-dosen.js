import axiosService from 'utils/axios';

const ENDPOINT = 'lokasidosen';

export async function getLokasiDosen({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}relasi`, { signal, params });
  return response.data;
}

export async function getLokasiDosenById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function getLokasiDosenByDosenId(dosenId) {
  const response = await axiosService.get(`/${ENDPOINT}/dosen/${dosenId}`);
  return response.data;
}

export async function createLokasiDosen(newLokasiDosen) {
  const response = await axiosService.post(`/${ENDPOINT}`, newLokasiDosen);
  return response.data;
}

export async function updateLokasiDosen(id, newLokasiDosen) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newLokasiDosen);
  return response.data;
}

export async function deleteLokasiDosen(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
