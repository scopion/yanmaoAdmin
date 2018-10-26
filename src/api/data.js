import axios from '@/libs/api.request'
const url = 'http://ympool.com'

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

// export const Login = (username, password) => { //搜索钱包信息
//   return axios.request({
//     url: '/api/public/admin_login',
//     data: {
//       username: username,
//       password: password,
//     },
//     method: 'getDragList'
//   })
// }

export const Wallent = () => { // 搜索钱包信息
  return axios.request({
    url: url + '/api/public/pool_walletinfo',
    method: 'get'
  })
}

export const Expense = () => { // 搜索钱包信息
  return axios.request({
    url: url + '/api/public/pool_expense',
    method: 'get'
  })
}
