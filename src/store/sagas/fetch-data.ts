import { call, put, takeLatest } from 'redux-saga/effects'

import { ADD_CREDENTIALS, ADD_USER_DATA, USER_FETCH_REQUESTED, ADD_REPOSITORIES, USER_FETCH_FAILED } from '../types'
import config from '../../config'
import { getUserData } from '../../services'

type repoArray = {owner: {login: string}}

const filterOwnerOnly = (data: repoArray[], user: string) => {
  console.log(data instanceof Array)
  if (data instanceof Array) {
    return data.filter(repo => repo.owner.login === user)
  }

  return data
}

function *fetchUser ({ data } : {data: {userName: string, token: string}}) {
  try {
    const userData = yield call(getUserData, { ...data, url: config.urls.user })
    const repositories = yield call(getUserData, { ...data, url: config.urls.repos })

    if (userData instanceof Error) {
      throw userData
    }

    if (repositories instanceof Error) {
      throw userData
    }

    /* Remove all repositories that is not directly owned by the user */
    const ownerRepositories = filterOwnerOnly(repositories, data.userName)

    yield put({ type: ADD_CREDENTIALS, data })
    yield put({ type: ADD_USER_DATA, data: userData })
    yield put({ type: ADD_REPOSITORIES, data: ownerRepositories })
  }
  catch (e) {
    yield put({ type: USER_FETCH_FAILED, data: { error: e.message } })
  }
}

function *fetchData () {
  yield takeLatest(USER_FETCH_REQUESTED, fetchUser)
}

export default fetchData
