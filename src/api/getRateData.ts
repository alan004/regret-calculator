import apiConfig from "../utils/apiConfig";

export async function getRateDataAsync(coin: string, cripto: string, startDate?: string | undefined) {
  
  const formattedDate = startDate != undefined ? new Date(startDate).toISOString() : null
  try {
    const response = await apiConfig.get(
      `exchangerate/${cripto}/${coin}`, {params: {time: formattedDate}});
    return response.data.rate;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}