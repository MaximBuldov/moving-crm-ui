import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer(params) {
    return qs.stringify(params);
  }
});

const $auth = axios.create({ method: 'POST' });

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$api.interceptors.request.use(authInterceptor);

export {
  $api,
  $auth
};

// const companyFilterInterceptor = config => {
//   const companyLS = localStorage.getItem('company');
//   if(companyLS) {
//     const fl = config.params?.filters?.$and ? config.params.filters.$and : [];
//     config.params = {
//       ...config.params,
//       filters: {
//         $and: [
//           ...fl,
//           { company: { id: { $eq: companyLS } } }
//         ]
//       }
//     };
//   }
//   return config;
// };

// const companyDataInterceptor = config => {
//   const company = localStorage.getItem('company');
//   if (company) {
//     config.data = {
//       data: {
//         ...config.data.data,
//         company
//       }
//     };
//   }
//   return config;
// };

// $apiGet.interceptors.request.use(companyFilterInterceptor);
// $apiPost.interceptors.request.use(companyDataInterceptor);
