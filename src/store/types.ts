import store from './'

const ADD_CREDENTIALS = 'ADD_CREDENTIALS'
const ADD_USER_DATA = 'ADD_USER_DATA'
const ADD_API_REFERENCES = 'ADD_API_REFERENCES'
const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED'
const USER_FETCH_FAILED = 'USER_FETCH_FAILED'
const ADD_REPOSITORIES = 'ADD_REPOSITORIES'

type ReduxDispatch = typeof store.dispatch

interface Credentials {
  userName: string | null;
  token: string | null;
}
/* eslint-disable @typescript-eslint/ban-types */
interface AddUserDataAction {
  type: typeof ADD_USER_DATA;
  data: object
}

interface UserData {
  [key: string]: string
}

interface ListData {
  [key: string]: any
}

interface State {
  repositories: ListData
  userData: UserData,
  credentials: Credentials
}

export {
  ADD_API_REFERENCES,
  ADD_CREDENTIALS,
  ADD_USER_DATA,
  ADD_REPOSITORIES,
  USER_FETCH_REQUESTED,
  USER_FETCH_FAILED,
  Credentials,
  AddUserDataAction,
  ReduxDispatch,
  State,
  ListData
}
