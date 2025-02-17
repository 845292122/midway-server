export const convertPageParam = (pageNo: number, pageSize: number) => {
  const skip: number = (Number(pageNo) - 1) * Number(pageSize)
  const take: number = Number(pageSize)
  return { skip, take }
}
