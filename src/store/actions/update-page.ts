import { UPDATE_PAGE } from '../types'

const updatePage = (id: string, payload: Record<string, unknown>) => ({
  type: UPDATE_PAGE,
  id,
  payload,
})

export default updatePage
