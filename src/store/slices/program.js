import axios from 'utils/axios';

export async function getProgram() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/programs?_expand=instansi`);
  return response.data;
}

export async function getProgramById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/program/${id}`);
  return response.data;
}
