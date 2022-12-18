// project imports
import axios from 'utils/axios';

// ----------------------------------------------------------------------

export async function getLokasi(params) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_lokasis?_expand=detail_sub_kegiatan&_expand=kota_kabupaten&_expand=kecamatan&_expand=kelurahan`,
    { params }
  );
  console.log(response.data);
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axios.get(`${process.env.BASE_URL_API}/detail_lokasis/${id}`);
  return response.data;
}
