import axiosService from 'utils/axios';

const ENDPOINT = 'statistik';

export async function countKelurahan(params) {
  const response = await axiosService.get(`/${ENDPOINT}/kelurahan/hitung`, { params });
  return response.data;
}

export async function getAdminById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}
