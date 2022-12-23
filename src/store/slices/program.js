import axiosService from 'utils/axios';

export async function getProgram({ signal, params }) {
  const response = await axiosService.get(`/programs?_expand=instansi`, { signal, params });
  return response.data;
}

export async function getProgramById(id) {
  const response = await axiosService.get(`/programs/${id}`);
  return response.data;
}
