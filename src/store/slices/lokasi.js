// project imports
import axios from 'utils/axios';

// ----------------------------------------------------------------------

export async function getLokasi(params) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_lokasis?_expand=kabupaten_kota&_expand=kecamatan&_expand=kelurahan&_expand=detail_sub_kegiatan`,
    { params }
  );
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axios.get(`${process.env.BASE_URL_API}/detail_lokasis/${id}`);
  return response.data;
}
