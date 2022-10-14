import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const $apiGet = axios.create({
  method: 'GET',
  paramsSerializer(params) {
    return qs.stringify(params);
  }
});

const $apiPut = axios.create({ method: 'PUT' });

const $apiPost = axios.create({ method: 'POST' });

const $auth = axios.create({ method: 'POST' });

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const companyFilterInterceptor = config => {
  const companyLS = localStorage.getItem('company');
  if(companyLS) {
    const fl = config.params?.filters?.$and ? config.params.filters.$and : [];
    config.params = {
      ...config.params,
      filters: {
        $and: [
          ...fl,
          { company: { id: { $eq: companyLS } } }
        ]
      }
    };
  }
  return config;
};

const companyDataInterceptor = config => {
  const company = localStorage.getItem('company');
  if (company) {
    config.data = {
      data: {
        ...config.data.data,
        company
      }
    };
  }
  return config;
};

$apiGet.interceptors.request.use(companyFilterInterceptor);
$apiPost.interceptors.request.use(companyDataInterceptor);

$apiGet.interceptors.request.use(authInterceptor);
$apiPost.interceptors.request.use(authInterceptor);
$apiPut.interceptors.request.use(authInterceptor);

export {
  $apiGet,
  $apiPost,
  $apiPut,
  $auth
};