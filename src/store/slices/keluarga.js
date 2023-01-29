import axiosService from 'utils/axios';

const ENDPOINT = 'keluarga';

export async function getKeluargaByKabupatenKotaId(kabupatenKotaId) {
  const response = await axiosService.get(`/${ENDPOINT}/${kabupatenKotaId}`);
  return response.data;
}

export async function getKeluargaById(kabupatenKotaId, id) {
  const response = await axiosService.get(`/${ENDPOINT}/detail/${kabupatenKotaId}/${id}`);
  return response.data;
}

export async function getKeluargaByIdKeluarga(kabupatenKotaId, idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${kabupatenKotaId}/${idKeluarga}`);
  console.log(response.data);
  return response.data;
}
