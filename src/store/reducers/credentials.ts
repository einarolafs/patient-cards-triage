import { ADD_CREDENTIALS, Credentials, USER_FETCH_FAILED } from '../types'

const initial: Credentials = {
  userName: null,
  token: null
}

const credentials = (state = initial, action) => {
  switch (action.type) {
    case ADD_CREDENTIALS:
      return { ...state, ...action.data }
    case USER_FETCH_FAILED:
      return { ...action.data }
    default:
      return state
  }
}

export default credentials
