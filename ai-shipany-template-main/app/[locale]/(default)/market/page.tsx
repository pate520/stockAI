import { useTranslations } from "next-intl";

export default function MarketPage() {
  const t = useTranslations("pages.market");

  // Mock market data
  const stocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 178.52,
      change: 2.34,
      changePercent: 1.33,
      volume: "52.3M",
      marketCap: "2.8T",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 378.91,
      change: -1.23,
      changePercent: -0.32,
      volume: "28.1M",
      marketCap: "2.8T",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 141.80,
      change: 3.45,
      changePercent: 2.49,
      volume: "31.2M",
      marketCap: "1.8T",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.25,
      change: 1.89,
      changePercent: 1.07,
      volume: "45.6M",
      marketCap: "1.8T",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 242.84,
      change: -5.67,
      changePercent: -2.28,
      volume: "98.7M",
      marketCap: "771B",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 495.22,
      change: 12.34,
      changePercent: 2.56,
      volume: "67.8M",
      marketCap: "1.2T",
    },
  ];

  const cryptos = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43250.50,
      change: 1234.56,
      changePercent: 2.94,
      volume: "28.5B",
      marketCap: "845B",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2280.75,
      change: -45.23,
      changePercent: -1.94,
      volume: "12.3B",
      marketCap: "274B",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* US Stocks */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("us_stocks")}</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">{t("symbol")}</th>
                <th className="text-left p-4">{t("name")}</th>
                <th className="text-right p-4">{t("price")}</th>
                <th className="text-right p-4">{t("change")}</th>
                <th className="text-right p-4">{t("change_percent")}</th>
                <th className="text-right p-4">{t("volume")}</th>
                <th className="text-right p-4">{t("market_cap")}</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="border-t hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-semibold">{stock.symbol}</td>
                  <td className="p-4 text-muted-foreground">{stock.name}</td>
                  <td className="p-4 text-right font-semibold">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`p-4 text-right font-semibold ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </td>
                  <td
                    className={`p-4 text-right font-semibold ${
                      stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {stock.volume}
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {stock.marketCap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cryptocurrency */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t("crypto")}</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">{t("symbol")}</th>
                <th className="text-left p-4">{t("name")}</th>
                <th className="text-right p-4">{t("price")}</th>
                <th className="text-right p-4">{t("change")}</th>
                <th className="text-right p-4">{t("change_percent")}</th>
                <th className="text-right p-4">{t("volume_24h")}</th>
                <th className="text-right p-4">{t("market_cap")}</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto) => (
                <tr
                  key={crypto.symbol}
                  className="border-t hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-semibold">{crypto.symbol}</td>
                  <td className="p-4 text-muted-foreground">{crypto.name}</td>
                  <td className="p-4 text-right font-semibold">
                    ${crypto.price.toLocaleString()}
                  </td>
                  <td
                    className={`p-4 text-right font-semibold ${
                      crypto.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {crypto.change >= 0 ? "+" : ""}
                    {crypto.change.toFixed(2)}
                  </td>
                  <td
                    className={`p-4 text-right font-semibold ${
                      crypto.changePercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {crypto.changePercent >= 0 ? "+" : ""}
                    {crypto.changePercent.toFixed(2)}%
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {crypto.volume}
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {crypto.marketCap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

