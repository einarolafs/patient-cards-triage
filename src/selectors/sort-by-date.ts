const sortByDate = (a, b) => {
  const aDate = new Date(a.created_at)
  const bDate = new Date(b.created_at)

  return bDate.getTime() - aDate.getTime()
}

export default sortByDate
