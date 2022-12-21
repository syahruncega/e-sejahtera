import axios from 'axios';

export async function getLokasi({ signal, params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/detail_lokasis?_expand=kabupaten_kota&_expand=kecamatan&_expand=kelurahan&_expand=detail_sub_kegiatan`,
    { signal, params }
  );
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axios.get(`${process.env.BASE_URL_API}/detail_lokasis/${id}`);
  return response.data;
}

export async function getKabupaten(provinsiId) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kabupaten_kotas?provinsiId=${provinsiId}`);
  return response.data;
}

export async function getKecamatan(kabupatenKotaId) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kecamatans?kabupaten_kotaId=${kabupatenKotaId}`);
  return response.data;
}

export async function getDesaKelurahan(kecamatanId) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kelurahans?kecamatanId=${kecamatanId}`);
  return response.data;
}
