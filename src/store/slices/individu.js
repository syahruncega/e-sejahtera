import axiosService from 'utils/axios';

const ENDPOINT = 'individu';

// export async function getKeluarga({ signal, params }) {
//   const response = await axiosService.get(`/${ENDPOINT}/donggala`, { signal, params });

//   return response.data;
// }

export async function getIndividuByIdKeluarga(kabupatenKotaId, idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${kabupatenKotaId}/${idKeluarga}`);
  console.log(response.data);
  return response.data;
}

export async function getIndividuById(kabupatenKotaId, id) {
  const response = await axiosService.get(`/${ENDPOINT}/detail/${kabupatenKotaId}/${id}`);
  return response.data;
}

// export async function getKeluargaByIdKeluarga(kabupatenKotaId, idKeluarga) {
//   const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${kabupatenKotaId}/${idKeluarga}`);
//   return response.data;
// }
