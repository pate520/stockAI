import { useTranslations } from "next-intl";

export default function StrategiesPage() {
  const t = useTranslations("pages.strategies");

  // Mock strategy data
  const strategies = [
    {
      id: 1,
      nameKey: "strategy_1_name",
      descKey: "strategy_1_desc",
      winRate: 68,
      totalTrades: 156,
      avgReturn: 12.5,
      risk: "medium",
      status: "active",
    },
    {
      id: 2,
      nameKey: "strategy_2_name",
      descKey: "strategy_2_desc",
      winRate: 72,
      totalTrades: 203,
      avgReturn: 8.3,
      risk: "low",
      status: "active",
    },
    {
      id: 3,
      nameKey: "strategy_3_name",
      descKey: "strategy_3_desc",
      winRate: 65,
      totalTrades: 89,
      avgReturn: 15.7,
      risk: "high",
      status: "inactive",
    },
    {
      id: 4,
      nameKey: "strategy_4_name",
      descKey: "strategy_4_desc",
      winRate: 70,
      totalTrades: 124,
      avgReturn: 10.2,
      risk: "medium",
      status: "active",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(strategy.nameKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(strategy.descKey)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  strategy.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {strategy.status === "active"
                  ? t("status_active")
                  : t("status_inactive")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  {t("win_rate")}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {strategy.winRate}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t("avg_return")}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {strategy.avgReturn}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t("total_trades")}
                </div>
                <div className="text-lg font-semibold">
                  {strategy.totalTrades}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t("risk_level")}
                </div>
                <div className="text-lg font-semibold">
                  {t(`risk_${strategy.risk}`)}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                {t("view_details")}
              </button>
              <button className="flex-1 px-4 py-2 border rounded-md hover:bg-accent transition-colors">
                {strategy.status === "active"
                  ? t("stop_strategy")
                  : t("start_strategy")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

