import { ADD_CREDENTIALS } from '../types'

const addCredentials = (userName, token) => ({
  type: ADD_CREDENTIALS,
  userName,
  token
})

export default addCredentials
