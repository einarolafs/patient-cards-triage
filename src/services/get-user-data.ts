import fetchService from './fetch-service'
import createAuthentication from './create-authentication'

const getUserData = async ({ userName, token, url }: {userName: string, token: string, url: string}): Promise<JSON> => {
  try {
    const headers = createAuthentication(userName, token)

    const data = await fetchService({ url, headers })

    return data
  }

  catch (error) {
    return error
  }
}

export default getUserData
