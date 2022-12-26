import axiosService from 'utils/axios';

export async function getLokasi({ signal, params }) {
  const response = await axiosService.get(
    `/detaillokasi?_expand=kabupaten_kota&_expand=kecamatan&_expand=kelurahan&_expand=detail_sub_kegiatan`,
    { signal, params }
  );
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axiosService.get(`/detaillokasi/${id}`);
  return response.data;
}

export async function getKabupaten(provinsiId) {
  const response = await axiosService.get(`/kabupatenkota?provinsiId=${provinsiId}`);
  return response.data;
}

export async function getKecamatan(kabupatenKotaId) {
  const response = await axiosService.get(`/kecamatan?kabupaten_kotaId=${kabupatenKotaId}`);
  return response.data;
}

export async function getDesaKelurahan(kecamatanId) {
  const response = await axiosService.get(`/kelurahan?kecamatanId=${kecamatanId}`);
  return response.data;
}
