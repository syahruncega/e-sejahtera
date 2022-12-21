import axios from 'axios';

export async function getProgram({ signal, params }) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/programs?_expand=instansi`, { signal, params });
  return response.data;
}

export async function getProgramById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/program/${id}`);
  return response.data;
}
