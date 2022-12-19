// project imports
import axios from 'utils/axios';

export async function getSubKegiatan(params) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/sub_kegiatans?_expand=kegiatan`, { params });
  return response.data;
}

export async function getSubKegiatanById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/sub_kegiatans/${id}?_expand=kegiatan`);
  return response.data;
}
