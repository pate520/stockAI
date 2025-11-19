import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const t = useTranslations("pages.history");

  // Mock trading history data
  const trades = [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "long",
      action: "open",
      quantity: 100,
      price: 175.20,
      total: 17520.0,
      date: "2024-01-15 09:30:00",
      status: "filled",
    },
    {
      id: 2,
      symbol: "MSFT",
      name: "Microsoft Corporation",
      type: "long",
      action: "close",
      quantity: 50,
      price: 380.15,
      total: 19007.5,
      profit: 1507.5,
      profitPercent: 8.61,
      date: "2024-01-14 15:45:00",
      status: "filled",
    },
    {
      id: 3,
      symbol: "TSLA",
      name: "Tesla Inc.",
      type: "short",
      action: "open",
      quantity: 50,
      price: 248.50,
      total: 12425.0,
      date: "2024-01-18 10:15:00",
      status: "filled",
    },
    {
      id: 4,
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      type: "long",
      action: "close",
      quantity: 80,
      price: 141.80,
      total: 11344.0,
      profit: -234.5,
      profitPercent: -2.03,
      date: "2024-01-12 14:20:00",
      status: "filled",
    },
    {
      id: 5,
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      type: "long",
      action: "open",
      quantity: 30,
      price: 482.88,
      total: 14486.4,
      date: "2024-01-20 11:00:00",
      status: "filled",
    },
    {
      id: 6,
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      type: "long",
      action: "close",
      quantity: 60,
      price: 178.25,
      total: 10695.0,
      profit: 567.8,
      profitPercent: 5.61,
      date: "2024-01-10 13:30:00",
      status: "filled",
    },
    {
      id: 7,
      symbol: "BTC",
      name: "Bitcoin",
      type: "long",
      action: "open",
      quantity: 0.5,
      price: 42000.0,
      total: 21000.0,
      date: "2024-01-22 16:00:00",
      status: "filled",
    },
    {
      id: 8,
      symbol: "ETH",
      name: "Ethereum",
      type: "short",
      action: "close",
      quantity: 5,
      price: 2280.75,
      total: 11403.75,
      profit: 345.6,
      profitPercent: 3.13,
      date: "2024-01-08 12:15:00",
      status: "filled",
    },
  ];

  const totalTrades = trades.length;
  const closedTrades = trades.filter((t) => t.action === "close");
  const totalProfit = closedTrades.reduce((sum, t) => sum + (t.profit || 0), 0);
  const winningTrades = closedTrades.filter((t) => (t.profit || 0) > 0).length;
  const winRate = closedTrades.length > 0 ? (winningTrades / closedTrades.length) * 100 : 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Trading Statistics */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_trades")}
          </div>
          <div className="text-2xl font-bold mt-2">{totalTrades}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("closed_trades")}
          </div>
          <div className="text-2xl font-bold mt-2">{closedTrades.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_profit_loss")}
          </div>
          <div
            className={`text-2xl font-bold mt-2 ${
              totalProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalProfit >= 0 ? "+" : ""}$
            {totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("win_rate")}
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-600">
            {winRate.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Trading List */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">{t("time")}</th>
              <th className="text-left p-4">{t("symbol")}</th>
              <th className="text-left p-4">{t("name")}</th>
              <th className="text-center p-4">{t("type")}</th>
              <th className="text-center p-4">{t("action")}</th>
              <th className="text-right p-4">{t("quantity")}</th>
              <th className="text-right p-4">{t("price")}</th>
              <th className="text-right p-4">{t("amount")}</th>
              <th className="text-right p-4">{t("profit_loss")}</th>
              <th className="text-right p-4">{t("profit_loss_percent")}</th>
              <th className="text-center p-4">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-t hover:bg-accent/50 transition-colors"
              >
                <td className="p-4 text-sm text-muted-foreground">
                  {trade.date}
                </td>
                <td className="p-4 font-semibold">{trade.symbol}</td>
                <td className="p-4 text-muted-foreground">{trade.name}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type === "long"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t(`type_${trade.type}`)}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.action === "open"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {t(`action_${trade.action}`)}
                  </span>
                </td>
                <td className="p-4 text-right">{trade.quantity}</td>
                <td className="p-4 text-right">${trade.price.toFixed(2)}</td>
                <td className="p-4 text-right font-semibold">
                  ${trade.total.toFixed(2)}
                </td>
                <td
                  className={`p-4 text-right font-semibold ${
                    trade.profit
                      ? trade.profit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                      : ""
                  }`}
                >
                  {trade.profit
                    ? `${trade.profit >= 0 ? "+" : ""}$${trade.profit.toFixed(2)}`
                    : "-"}
                </td>
                <td
                  className={`p-4 text-right font-semibold ${
                    trade.profitPercent
                      ? trade.profitPercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                      : ""
                  }`}
                >
                  {trade.profitPercent
                    ? `${trade.profitPercent >= 0 ? "+" : ""}${trade.profitPercent.toFixed(2)}%`
                    : "-"}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                    {t(`status_${trade.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

