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

export const getCurrentPrice = async (ticker) => {
  try {
    const response = await axios.get(
      `${UPBIT_API_URL}/ticker?markets=KRW-${ticker}`
    );
    return response.data[0].trade_price;
  } catch (error) {
    console.error("Error fetching current price:", error);
    return 0;
  }
};

export const getTopGainers = async () => {
  try {
    const response = await axios.get(
      `${UPBIT_API_URL}/ticker?markets=KRW-BTC,KRW-ETH,KRW-XRP,KRW-SOL,KRW-ADA,KRW-DOGE,KRW-DOT,KRW-AVAX,KRW-MATIC,KRW-LINK,KRW-UNI,KRW-ATOM,KRW-LTC,KRW-ETC,KRW-TRX`
    );
    const sortedData = response.data
      .sort((a, b) => b.signed_change_rate - a.signed_change_rate)
      .slice(0, 10)
      .map((coin) => ({
        ticker: coin.market.replace("KRW-", ""),
        currentPrice: coin.trade_price,
        changeRate: coin.signed_change_rate * 100,
        changePrice: coin.signed_change_price,
        accTradeVolume24h: coin.acc_trade_volume_24h,
      }));
    return sortedData;
  } catch (error) {
    console.error("Error fetching top gainers:", error);
    return [];
  }
};
