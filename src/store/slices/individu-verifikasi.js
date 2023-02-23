import axiosService from 'utils/axios';

const ENDPOINT = 'individuverifikasi';

export async function getIndividuVerifikasi(params) {
  const response = await axiosService.get(`/${ENDPOINT}/search`, { params });
  return response.data;
}

export async function getIndividuVerifikasiByIdKeluarga(idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${idKeluarga}`);
  return response.data;
}

export async function getIndividuVerifikasiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createIndividuVerifikasi(newIndividuVerifikasi) {
  const response = await axiosService.post(`/${ENDPOINT}`, newIndividuVerifikasi);
  return response.data;
}

export async function updateIndividuVerfikasi(id, newIndividuVerfikasi) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newIndividuVerfikasi);
  return response.data;
}

export async function deleteIndividuVerfikasi(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
