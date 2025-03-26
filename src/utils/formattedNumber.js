export const formattedNumber = (
  number, // * số nhập vào  null || undefined => number = 0
) =>
  typeof +number === 'number' && !isNaN(+number)
    ? number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : `0`

export const roundToDecimal = (num, decimalPlaces) => {
  let factor = Math.pow(10, decimalPlaces)
  let rounded = Math.round((num ?? 0) * factor) / factor
  return Number.isInteger(rounded) ? rounded : rounded.toFixed(decimalPlaces)
}
