const getEndPoint = <T extends Record<string, string>>(baseURL: string, subEndpoint: T) => {
  for (const key in subEndpoint) {
    subEndpoint[key] = `${baseURL}${subEndpoint[key]}` as T[Extract<keyof T, string>]
  }

  return subEndpoint
}

const _authEndpoint = {
  BASE: '',
  LOGIN: '/login/',
  REFRESH: '/refresh/',
  REGISTER: '/register/',
}

const _userEndpoint = {
  BASE: '',
  GET_ME: '/get_me/',
}

const _studentEndpoint = {
  BASE: '/',
  CREATE: '/create/',
}

const _classEndpoint = {
  BASE: '',
  CREATE: '/create/',
}

const _subjectEndpoint = {
  BASE: '',
}

const _userClassEndpoint = {
  BASE: '',
}

export const authEndpoint = getEndPoint('/auth', _authEndpoint)
export const userEndpoint = getEndPoint('/user', _userEndpoint)
export const studentEndpoint = getEndPoint('/student', _studentEndpoint)
export const classEndpoint = getEndPoint('/class', _classEndpoint)
export const subjectEndpoint = getEndPoint('/subject', _subjectEndpoint)
export const userClassEndpoint = getEndPoint('/user_class', _userClassEndpoint)
