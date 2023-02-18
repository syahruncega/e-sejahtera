import axiosService from 'utils/axios';

export async function getKabupatenKota(provinsiId) {
  const response = await axiosService.get(`/kabupatenkota?provinsiid=${provinsiId}`);
  return response.data;
}

export async function getKecamatan(kabupatenKotaId) {
  const response = await axiosService.get(`/kecamatan?kabupatenkotaid=${kabupatenKotaId}`);
  return response.data;
}

export async function getDesaKelurahan(kecamatanId) {
  const response = await axiosService.get(`/kelurahan?kecamatanid=${kecamatanId}`);
  return response.data;
}
