import axiosService from 'utils/axios';

const ENDPOINT = 'keluarga';

export async function getKeluargaDonggala({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}/donggala`, { signal, params });

  return response.data;
}

export async function getKeluargaDonggalById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/donggala/${id}`);
  return response.data;
}

export async function getKeluargaSigi({ signal, params }) {
  const response = await axiosService.get(`/${ENDPOINT}/sigi`, { signal, params });
  console.log(response.data);
  return response.data;
}

export async function getKeluargaSigiById(id) {
  const response = await axiosService.get(`/${ENDPOINT}/sigi/${id}`);
  return response.data;
}

// export async function createInstansi(newInstansi) {
//   const response = await axiosService.post(`/${ENDPOINT}`, newInstansi);
//   return response.data;
// }

// export async function updateInstansi(id, newInstansi) {
//   const response = await axiosService.patch(`/${ENDPOINT}/${id}`, newInstansi);
//   return response.data;
// }

// export async function deleteInstansi(id) {
//   await axiosService.delete(`/${ENDPOINT}/${id}`);
// }
