
import { API as customAxios } from './axiosUrl';

const requestHandler = (request: any) => {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage.getItem('profile') || '{}'
  );

  const token = getTokenFromLocalStorage.token;
  request.headers.Authorization = `Bearer ${token}`;

  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    localStorage.removeItem('profile');
  }
  return response;
};

const errorHandler = (error: Error) => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
)

export default customAxios