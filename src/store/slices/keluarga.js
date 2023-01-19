import axiosService from 'utils/axios';

const ENDPOINT = 'keluarga';

// export async function getKeluarga({ signal, params }) {
//   const response = await axiosService.get(`/${ENDPOINT}/donggala`, { signal, params });

//   return response.data;
// }

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
  return response.data;
}

// export async function createInstansi(newInstansi) {
//   const response = await axiosService.post(`/${ENDPOINT}`, newInstansi);
//   return response.data;
// }

// export async function updateInstansi(id, newInstansi) {
//   const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newInstansi);
//   return response.data;
// }

// export async function deleteInstansi(id) {
//   await axiosService.delete(`/${ENDPOINT}/${id}`);
// }
