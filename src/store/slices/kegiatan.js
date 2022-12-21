import axios from 'axios';

export async function getKegiatan({ signal, params }) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kegiatans?_expand=program`, { signal, params });
  return response.data;
}

export async function getKegiatanById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kegiatan/${id}`);
  return response.data;
}
