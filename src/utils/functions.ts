import { getRateDataAsync } from "../api/getRateData"
import { getUSDtoBRL } from "../api/getUSDtoBRL"

export const calculateEndValue = async (
  value: number,
  fromCurrency: string,
  toCurrency: string,
  startDate: string
) => {
  let finalValue

  if (
    fromCurrency === "BRL" &&
    new Date(startDate) < new Date("2021-01-01")
  ) {
    const [dolarHoje, dolarInicial] = await Promise.all([
      getUSDtoBRL(),
      getUSDtoBRL(startDate),
    ])
    const [firstValue, currentValue] = await Promise.all([
      getRateDataAsync("USD", toCurrency, startDate),
      getRateDataAsync("USD", toCurrency),
    ])

    const valueInUSD = value / dolarInicial
    const btcAmount = valueInUSD / firstValue
    const finalValueUSD = btcAmount * currentValue
    finalValue = finalValueUSD * dolarHoje
  } else {
    const firstValue = await getRateDataAsync(
      fromCurrency,
      toCurrency,
      startDate
    )
    const currentValue = await getRateDataAsync(fromCurrency, toCurrency)
    const initialConvertedValue = value / firstValue
    finalValue = initialConvertedValue * currentValue
  }
  return Number(finalValue)
}