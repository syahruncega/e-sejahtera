import axiosService from 'utils/axios';

const ENDPOINT = 'keluarga';

export async function getAllKeluarga() {
  const response = await axiosService.get(`/${ENDPOINT}`);
  return response.data;
}
export async function getKeluarga(params) {
  const response = await axiosService.get(`/${ENDPOINT}/search`, { params });
  return response.data;
}

export async function getKeluargaById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function getKeluargaByIdKeluarga(idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${idKeluarga}`);
  return response.data;
}
