import axiosService from 'utils/axios';

export async function getLokasi({ signal, params }) {
  const response = await axiosService.get(
    `/detail_lokasis?_expand=kabupaten_kota&_expand=kecamatan&_expand=kelurahan&_expand=detail_sub_kegiatan`,
    { signal, params }
  );
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axiosService.get(`/detail_lokasis/${id}`);
  return response.data;
}

export async function getKabupaten(provinsiId) {
  const response = await axiosService.get(`/kabupaten_kotas?provinsiId=${provinsiId}`);
  return response.data;
}

export async function getKecamatan(kabupatenKotaId) {
  const response = await axiosService.get(`/kecamatans?kabupaten_kotaId=${kabupatenKotaId}`);
  return response.data;
}

export async function getDesaKelurahan(kecamatanId) {
  const response = await axiosService.get(`/kelurahans?kecamatanId=${kecamatanId}`);
  return response.data;
}
