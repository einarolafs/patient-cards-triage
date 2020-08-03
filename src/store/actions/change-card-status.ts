import { UPDATE_CARD_STATUS } from '../types'

const changeCardStatus = (id: string, status: string) => ({
  type: UPDATE_CARD_STATUS,
  payload: {
    id,
    status,
  },
})

export default changeCardStatus
