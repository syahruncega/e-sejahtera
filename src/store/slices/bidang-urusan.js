import axiosService from 'utils/axios';

const ENDPOINT = 'bidangurusan';

export async function getBidangUrusan({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}`, { signal, params });
  return response.data;
}

export async function getBidangUrusanById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/${id}`);
  return response.data;
}

export async function createBidangUrusan(newBidangUrusan) {
  console.log(newBidangUrusan);
  const response = await axiosService.post(`/${ENDPOINT}`, newBidangUrusan);
  return response.data;
}

export async function updateBidangUrusan(id, newBidangUrusan) {
  const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newBidangUrusan);
  return response.data;
}

export async function deleteBidangUrusan(id) {
  await axiosService.delete(`/${ENDPOINT}/${id}`);
}
