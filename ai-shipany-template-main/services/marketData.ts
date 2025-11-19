export interface MarketPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

export async function getBTCPrice(): Promise<MarketPrice> {
  try {
    // Try fetching from Binance Public API
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch price');
    }

    const data = await response.json();
    return {
      symbol: 'BTCUSDT',
      price: parseFloat(data.price),
      timestamp: Date.now(),
    };
  } catch (error) {
    console.warn('Failed to fetch real price, using mock data', error);
    // Fallback to mock data with slight random variation
    const basePrice = 65000;
    const randomVariation = (Math.random() - 0.5) * 100; // +/- 50
    return {
      symbol: 'BTCUSDT',
      price: basePrice + randomVariation,
      timestamp: Date.now(),
    };
  }
}
