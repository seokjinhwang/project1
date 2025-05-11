import axios from "axios";

const UPBIT_API_URL = "https://api.upbit.com/v1";

export const getCurrentPrices = async (tickers) => {
  try {
    const response = await axios.get(`${UPBIT_API_URL}/ticker`, {
      params: {
        markets: tickers,
      },
    });

    const prices = {};
    response.data.forEach((item) => {
      prices[item.market] = item.trade_price;
    });

    return prices;
  } catch (error) {
    console.error("Error fetching current prices:", error);
    return {};
  }
};
