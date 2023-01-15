import axiosService from 'utils/axios';

const ENDPOINT = 'monev';

// export async function getMonev({ signal, params }) {
//   const response = await axiosService.get(`/${ENDPOINT}/`, { signal, params });
//   console.log(response.data);
//   return response.data;
// }

export async function getMonevKabupatenKotaId(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function getMonevById(kabupatenKotaId, id) {
  const response = await axiosService.get(`/${ENDPOINT}/detail/${kabupatenKotaId}/${id}`);
  return response.data;
}
