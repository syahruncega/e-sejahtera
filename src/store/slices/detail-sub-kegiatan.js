import axios from 'axios';

export async function getDetailSubKegiatan({ signal, params }) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_sub_kegiatans?_extend=sub_kegiatans`, {
    signal,
    params
  });
  return response.data;
}

export async function getDetailSubKegiatanById(id) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_sub_kegiatans/${id}`);
  return response.data;
}
