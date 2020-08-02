import store from './'

const ADD_CARDS = 'ADD_CARDS'
const DATA_FETCH_FAILED = 'DATA_FETCH_FAILED'
const FETCH_CARDS_REQUESTED = 'FETCH_CARDS_REQUESTED'

type ReduxDispatch = typeof store.dispatch

enum CardStatus {PENDING = 'PENDING', REJECTED = 'REJECTED', DONE = 'DONE'}

/* eslint-disable camelcase */
interface CardInterface {
    arrhythmias: string[];
    created_date: Date;
    id: number;
    patient_name: string;
    status: CardStatus;
}

export {
  ADD_CARDS,
  DATA_FETCH_FAILED,
  FETCH_CARDS_REQUESTED,
  ReduxDispatch,
  CardInterface,
  CardStatus
}
