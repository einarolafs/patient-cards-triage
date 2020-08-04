import { UPDATE_CARD_STATUS } from '../types'

type ChangeCardStatusProps = {
  id: string
  status: string
}

const changeCardStatus = ({ id, status }: ChangeCardStatusProps) => ({
  type: UPDATE_CARD_STATUS,
  payload: {
    id,
    status,
  },
})

export default changeCardStatus
