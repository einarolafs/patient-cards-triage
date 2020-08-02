const createAuthentication = (userName: string, token:string) => {
  const authentication = btoa(`${userName}:${token}`)

  return new Headers({ Authorization: `Basic ${authentication}` })
}

export default createAuthentication
