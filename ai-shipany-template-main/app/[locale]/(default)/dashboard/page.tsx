import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("pages.dashboard");

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Account Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("virtual_balance")}
          </div>
          <div className="text-2xl font-bold mt-2">$100,000.00</div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("initial_capital")}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_profit_loss")}
          </div>
          <div className="text-2xl font-bold mt-2 text-green-600">
            +$5,234.56
          </div>
          <p className="text-xs text-green-600 mt-1">
            ↑ {t("vs_yesterday")} +$234.56
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("return_rate")}
          </div>
          <div className="text-2xl font-bold mt-2 text-green-600">+5.23%</div>
          <p className="text-xs text-green-600 mt-1">
            ↑ {t("vs_yesterday")} +0.23%
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            {t("total_trades")}
          </div>
          <div className="text-2xl font-bold mt-2">42</div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("win_rate")} 68%
          </p>
        </div>
      </div>

      {/* Profit Curve */}
      <div className="rounded-lg border bg-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("profit_curve")}</h2>
        <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded">
          {t("profit_curve_placeholder")}
        </div>
      </div>

      {/* Recent Trades */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t("recent_trades")}</h2>
          <a href="/history" className="text-sm text-primary hover:underline">
            {t("view_all")} →
          </a>
        </div>
        <div className="space-y-3">
          {[
            {
              symbol: "AAPL",
              action: "buy",
              price: 178.52,
              profit: "+$332.00",
              time: "2",
              isProfit: true,
            },
            {
              symbol: "TSLA",
              action: "sell",
              price: 242.84,
              profit: "+$283.00",
              time: "5",
              isProfit: true,
            },
            {
              symbol: "NVDA",
              action: "buy",
              price: 495.22,
              profit: "+$370.20",
              time: "1",
              isProfit: true,
            },
          ].map((trade, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {trade.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{trade.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {t(trade.action)} · ${trade.price}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold ${
                    trade.isProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trade.profit}
                </div>
                <div className="text-sm text-muted-foreground">
                  {trade.time}{" "}
                  {index === 2 ? t("days_ago") : t("hours_ago")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

