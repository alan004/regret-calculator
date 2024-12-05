import apiConfig from "../utils/apiConfig";

function adjustToNextWeekday(date: Date): Date {
  const day = date.getDay();
  if (day === 6) {
    date.setDate(date.getDate() + 2);
  } else if (day === 0) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function formatDateToAPI(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}-${year}`;
}

export async function getUSDtoBRL(referenceDate?: string | undefined) {
  let originalDate = referenceDate ? new Date(referenceDate) : new Date();


  if (!referenceDate) {
    originalDate.setDate(originalDate.getDate() - 3);
  }
  originalDate = adjustToNextWeekday(originalDate);
  const startFormatted = formatDateToAPI(originalDate);

  try {
    const response = await apiConfig.request({
      url: `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${startFormatted}%27&$top=100&$format=json`,
      baseURL: `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata`,
      method: 'GET',
      headers: {},
    });
    const closingRate = Number(response.data.value[0].cotacaoCompra); 
    if (closingRate) {
      return closingRate;
    } else {
      throw new Error("Nenhum dado encontrado para a data especificada.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
