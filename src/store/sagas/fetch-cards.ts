import { call, put, takeLatest } from 'redux-saga/effects'

import { ADD_CARDS, DATA_FETCH_FAILED, FETCH_CARDS_REQUESTED } from '../types'
import { getCardsData } from '../../services'

function *fetchCardsData ({ url }: {url: string}) {
  try {
    console.log(url);
    const data = yield call(getCardsData, { url })

    console.log(data)

    yield put({ type: ADD_CARDS, data })
  }
  catch (e) {
    yield put({ type: DATA_FETCH_FAILED, data: { error: e.message } })
  }
}

function *fetchCards () {
  yield takeLatest(FETCH_CARDS_REQUESTED, fetchCardsData)
}

export default fetchCards
