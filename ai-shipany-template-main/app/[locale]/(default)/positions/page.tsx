import { useTranslations } from "next-intl";

export default function PositionsPage() {
  const t = useTranslations("pages.positions");

  // Mock position data
  const positions = [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "long",
      quantity: 100,
      avgPrice: 175.20,
      currentPrice: 178.52,
      totalCost: 17520.0,
      currentValue: 17852.0,
      profit: 332.0,
      profitPercent: 1.89,
      openDate: "2024-01-15",
    },
    {
      id: 2,
      symbol: "TSLA",
      name: "Tesla Inc.",
      type: "short",
      quantity: 50,
      avgPrice: 248.50,
      currentPrice: 242.84,
      totalCost: 12425.0,
      currentValue: 12142.0,
      profit: 283.0,
      profitPercent: 2.28,
      openDate: "2024-01-18",
    },
    {
      id: 3,
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      type: "long",
      quantity: 30,
      avgPrice: 482.88,
      currentPrice: 495.22,
      totalCost: 14486.4,
      currentValue: 14856.6,
      profit: 370.2,
      profitPercent: 2.56,
      openDate: "2024-01-20",
    },
    {
      id: 4,
      symbol: "BTC",
      name: "Bitcoin",
      type: "long",
      quantity: 0.5,
      avgPrice: 42000.0,
      currentPrice: 43250.5,
      totalCost: 21000.0,
      currentValue: 21625.25,
      profit: 625.25,
      profitPercent: 2.98,
      openDate: "2024-01-22",
    },
  ];

  const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Position Statistics */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_positions")}
          </div>
          <div className="text-2xl font-bold mt-2">{positions.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_value")}
          </div>
          <div className="text-2xl font-bold mt-2">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
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
      </div>

      {/* Position List */}
      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">{t("symbol")}</th>
              <th className="text-left p-4">{t("name")}</th>
              <th className="text-center p-4">{t("type")}</th>
              <th className="text-right p-4">{t("quantity")}</th>
              <th className="text-right p-4">{t("avg_price")}</th>
              <th className="text-right p-4">{t("current_price")}</th>
              <th className="text-right p-4">{t("cost")}</th>
              <th className="text-right p-4">{t("market_value")}</th>
              <th className="text-right p-4">{t("profit_loss")}</th>
              <th className="text-right p-4">{t("profit_loss_percent")}</th>
              <th className="text-center p-4">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr
                key={position.id}
                className="border-t hover:bg-accent/50 transition-colors"
              >
                <td className="p-4 font-semibold">{position.symbol}</td>
                <td className="p-4 text-muted-foreground">{position.name}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      position.type === "long"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t(`type_${position.type}`)}
                  </span>
                </td>
                <td className="p-4 text-right">{position.quantity}</td>
                <td className="p-4 text-right">
                  ${position.avgPrice.toFixed(2)}
                </td>
                <td className="p-4 text-right font-semibold">
                  ${position.currentPrice.toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  ${position.totalCost.toFixed(2)}
                </td>
                <td className="p-4 text-right font-semibold">
                  ${position.currentValue.toFixed(2)}
                </td>
                <td
                  className={`p-4 text-right font-semibold ${
                    position.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {position.profit >= 0 ? "+" : ""}$
                  {position.profit.toFixed(2)}
                </td>
                <td
                  className={`p-4 text-right font-semibold ${
                    position.profitPercent >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {position.profitPercent >= 0 ? "+" : ""}
                  {position.profitPercent.toFixed(2)}%
                </td>
                <td className="p-4 text-center">
                  <button className="px-3 py-1 text-sm border rounded hover:bg-accent transition-colors">
                    {t("close_position")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
