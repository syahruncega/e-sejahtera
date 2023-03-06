import axiosService from 'utils/axios';

const ENDPOINT = 'bidangurusanoninstansi';

export async function getBidangUrusanOnInstansi({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getBidangUrusanOnInstansiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createBidangUrusanOnInstansi(newBidangUrusanOnInstansi) {
  const response = await axiosService.post(`/${ENDPOINT}`, newBidangUrusanOnInstansi);
  return response.data;
}

export async function updateBidangUrusanOnInstansi(id, newBidangUrusanOnInstansi) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newBidangUrusanOnInstansi);
  return response.data;
}

export async function deleteBidangUrusanOnInstansi(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
