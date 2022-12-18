// project imports
import axios from 'utils/axios';

export async function getKegiatan(params) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kegiatans?_expand=program`, { params });
  return response.data;
}

export async function getKegiatanById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kegiatan/${id}`);
  return response.data;
}
