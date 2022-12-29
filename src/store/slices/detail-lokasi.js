import axiosService from 'utils/axios';

const ENDPOINT = 'detaillokasi';

export async function getDetailLokasi({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}relasi`, { signal, params });
  return response.data;
}

export async function getDetailLokasiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createDetailLokasi(newDetailLokasi) {
  console.log(newDetailLokasi);
  const response = await axiosService.post(`/${ENDPOINT}`, newDetailLokasi);
  return response.data;
}

export async function updateDetailLokasi(id, newDetailLokasi) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newDetailLokasi);
  return response.data;
}

export async function deleteDetailLokasi(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}

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
