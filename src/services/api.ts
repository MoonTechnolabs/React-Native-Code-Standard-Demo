// import axios from 'axios';

import { METHODS, STATUS_CODE, API_INSTANCE } from 'services/apiConfig';
import { isConnected } from 'utils/functions';
import { getToken } from 'utils/asyncStorage';
import { IApi } from 'interfaces/ApiInterface';

const getHeaders = async ({ isToken = false, header = {} }) => {
  try {
    const authToken = await getToken();
    let headers = { ...header };
    if (isToken) {
      headers = {
        ...header,
        Authorization: `Bearer ${authToken || ''}`,
      };
    }
    return headers;
  } catch (error) {
    console.log('get header error: ', error);
  }
};

async function apiCall(params: IApi) {
  if (!await isConnected()) {
    return { data: { code: STATUS_CODE.noInternet } };
  }

  const { url, method = METHODS.GET, body = {}, isToken = false, header = {} } = params;
  const headers = await getHeaders({ isToken, header });

  // const API_URL = `${API_CONFIG.baseUrl}${url}`;
  // const timeout = API_CONFIG.timeout;
  let response;

  console.log('API request: ', { headers: headers });
  switch (method) {
    case METHODS.POST:
      // response = await axios({ method: METHODS.POST, url: API_URL, data: body, headers, timeout });
      response = await API_INSTANCE.post(url, body, { headers });
      break;
    default:
      // response = await axios({ method: METHODS.GET, url: API_URL, headers, timeout });
      response = await API_INSTANCE.get(url, { headers });
      break;
  }

  console.log('API response: ', response);
  return response;
}

export { apiCall };
