import axiosService from 'utils/axios';

const ENDPOINT = 'individu';

// export async function getKeluarga({ signal, params }) {
//   const response = await axiosService.get(`/${ENDPOINT}/donggala`, { signal, params });

//   return response.data;
// }

export async function getIndividuByIdKeluarga(idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${idKeluarga}`);
  console.log(response.data);
  return response.data;
}

export async function getIndividuById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

// export async function getKeluargaByIdKeluarga(kabupatenKotaId, idKeluarga) {
//   const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${kabupatenKotaId}/${idKeluarga}`);
//   return response.data;
// }
