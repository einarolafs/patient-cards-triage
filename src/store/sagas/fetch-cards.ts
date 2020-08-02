import { call, put, takeLatest } from 'redux-saga/effects'
import camelcase from 'camelcase'

import { ADD_CARDS, DATA_FETCH_FAILED, FETCH_CARDS_REQUESTED, CardInterface } from '../types'
import { getCardsData } from '../../services'

const normaliseKeys = (cards: CardInterface[]) => cards.map((card) => {
  const changedEntries = Object.entries(card).map(item => [camelcase(item[0]), item[1]])

  return Object.fromEntries(changedEntries)
})

function *fetchCardsData ({ url }: {url: string}) {
  try {
    const data = yield call(getCardsData, { url })

    const normaliseCardData = normaliseKeys(data)

    yield put({ type: ADD_CARDS, data: normaliseCardData })
  }
  catch (e) {
    yield put({ type: DATA_FETCH_FAILED, data: { error: e.message } })
  }
}

function *fetchCards () {
  yield takeLatest(FETCH_CARDS_REQUESTED, fetchCardsData)
}

export default fetchCards
