import axiosService from 'utils/axios';

export async function getInstansi({ signal, params }) {
  const response = await axiosService.get('/instansis', { signal, params });
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axiosService.get(`/instansis/${id}`);
  return response.data;
}
