export const updateSeachParams = (data: Record<string, number | string | null | undefined>) => {
  const searchParams = new URLSearchParams(window.location.search)

  for (const key in data) {
    if (data[key] || data[key] === 0) {
      searchParams.set(key, data[key] as string)
    } else searchParams.delete(key)
  }

  return `${window.location.pathname}?${searchParams.toString()}`
}
