export const numberFormatter = (value: any) =>
  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''

export const numberParser = (value: any) =>
  (value ? Number(String(value).replace(/\$|,/g, '')) : 0) as any
