import axiosService from 'utils/axios';

const ENDPOINT = 'individu';

export async function getIndividuByIdKeluarga(idKeluarga) {
  const response = await axiosService.get(`/${ENDPOINT}/idkeluarga/${idKeluarga}`);
  return response.data;
}

export async function getIndividuById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function updateIndividu(id, newIndividu) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newIndividu);
  return response.data;
}
