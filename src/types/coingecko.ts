export interface CoinGeckoMarketData {
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  current_price: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
  total_volume: {
    usd: number;
  };
  last_updated: string;
}

export interface CoinGeckoResponse {
  market_data: CoinGeckoMarketData;
  [key: string]: unknown;
}
