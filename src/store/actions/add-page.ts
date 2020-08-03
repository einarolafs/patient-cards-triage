import { ADD_PAGE } from '../types'

const addPage = (id: string, payload: Record<string, unknown>) => ({
  type: ADD_PAGE,
  id,
  payload
})

export default addPage
