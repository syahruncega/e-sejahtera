import axiosService from 'utils/axios';

const ENDPOINT = 'keluargaverifikasi';

export async function getKeluargaVerifikasi(params) {
  const response = await axiosService.get(`/${ENDPOINT}/search`, { params });
  return response.data;
}

export async function getKeluargaVerifikasiByIdKeluarga(idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${idKeluarga}`);
  return response.data;
}

export async function getKeluargaVerifikasiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createKeluargaVerifikasi(newKeluargaVerifikasi) {
  console.log(newKeluargaVerifikasi);
  const response = await axiosService.post(`/${ENDPOINT}`, newKeluargaVerifikasi);
  console.log(response.data);
  return response.data;
}

export async function updateKeluargaVerfikasi(id, newKeluargaVerfikasi) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newKeluargaVerfikasi);
  return response.data;
}

export async function deleteKeluargaVerfikasi(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
