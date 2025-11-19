import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Strategy, Position, TradingStatus } from "@/hooks/useTradingSimulation";
import { Activity, ArrowUpRight, ShieldCheck, Zap, CheckCircle2, TrendingUp, Brain, Target, BarChart2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect, useRef } from "react";

interface TradingDashboardProps {
    status: TradingStatus;
    strategy: Strategy | null;
    currentPrice: number | null;
    startPrice: number | null;
    position: Position | null;
    onStartTrading: () => void;
    onCompleteTrade: () => void;
}

// Mock data generator
const generateInitialData = (startPrice: number) => {
    const data = [];
    let price = startPrice;
    for (let i = 0; i < 30; i++) {
        price = price * (1 + (Math.random() - 0.5) * 0.002);
        data.push({ time: i, price });
    }
    return data;
};

interface Insight {
    id: string;
    type: 'analysis' | 'risk' | 'signal' | 'execution';
    message: string;
    timestamp: number;
}

export default function TradingDashboard({
    status,
    strategy,
    currentPrice,
    startPrice,
    position,
    onStartTrading,
    onCompleteTrade,
}: TradingDashboardProps) {
    const t = useTranslations("trading_dashboard");
    const [chartData, setChartData] = useState<{ time: number; price: number }[]>([]);
    const [insights, setInsights] = useState<Insight[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        if (status === 'trading' && startPrice && chartData.length === 0) {
            setChartData(generateInitialData(startPrice));
            addInsight('analysis', "AI Agent initialized. Scanning market structure...");
        }
    }, [status, startPrice, strategy, chartData.length]);

    // Live Updates
    useEffect(() => {
        if (status === 'trading' && currentPrice) {
            setChartData(prev => {
                const newData = [...prev, { time: prev.length, price: currentPrice }];
                if (newData.length > 60) newData.shift();
                return newData;
            });

            // Simulate AI Insights
            if (Math.random() > 0.8) {
                const newInsight = getRandomInsight();
                addInsight(newInsight.type, newInsight.message);
            }
        }
    }, [currentPrice, status]);

    // Auto-scroll insights
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [insights]);

    const addInsight = (type: Insight['type'], message: string) => {
        setInsights(prev => [...prev, { id: Math.random().toString(), type, message, timestamp: Date.now() }]);
    };

    const getRandomInsight = () => {
        const options: { type: Insight['type'], message: string }[] = [
            { type: 'analysis', message: "Volatility contraction detected." },
            { type: 'signal', message: "RSI divergence on 5m timeframe." },
            { type: 'risk', message: "Dynamic stop-loss adjusted." },
            { type: 'analysis', message: "Order flow imbalance favoring bulls." },
            { type: 'signal', message: "Key resistance level tested." },
        ];
        return options[Math.floor(Math.random() * options.length)];
    };

    if (!strategy) return null;

    const profitPercent = currentPrice && startPrice ? ((currentPrice - startPrice) / startPrice * 100) : 0;
    const isProfitable = profitPercent >= 0;

    return (
        <div className="container mx-auto max-w-7xl py-8 px-4 min-h-[800px] flex flex-col">

            {/* Header / HUD Top Bar */}
            <motion.div
                layout
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Zap className="size-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{strategy.name}</h2>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <Badge variant="outline" className="font-mono text-xs">{strategy.risk} Risk</Badge>
                            <span>•</span>
                            <span>{strategy.description}</span>
                        </div>
                    </div>
                </div>

                {status === 'ready' && (
                    <Button size="lg" onClick={onStartTrading} className="px-8 h-12 text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                        {t("start_trading_btn")}
                        <ArrowUpRight className="ml-2 size-5" />
                    </Button>
                )}

                {(status === 'trading' || status === 'completed') && (
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Current P&L</div>
                            <div className={`text-2xl font-mono font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                                {isProfitable ? '+' : ''}{profitPercent.toFixed(2)}%
                            </div>
                        </div>
                        {status === 'trading' && (
                            <Button variant="secondary" size="sm" onClick={onCompleteTrade} className="h-10">
                                {t("debug_btn")}
                            </Button>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {status === 'ready' ? (
                    /* Strategy Detail View */
                    <motion.div
                        key="ready"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-center items-center min-h-[400px]">
                            <div className="text-center space-y-4 max-w-md">
                                <div className="mx-auto size-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                                    <Brain className="size-10 text-primary/60" />
                                </div>
                                <h3 className="text-xl font-semibold">AI Strategy Ready</h3>
                                <p className="text-muted-foreground">
                                    The AI has analyzed market conditions and prepared the <strong>{strategy.name}</strong> execution plan.
                                    Click "Start Trading" to activate the autonomous agent.
                                </p>
                            </div>
                        </Card>
                        <div className="space-y-6">
                            <MetricCard label={t("expected_return")} value={strategy.expectedReturn} icon={<TrendingUp className="text-green-500" />} />
                            <MetricCard label="AI Confidence" value="94.2%" icon={<Target className="text-blue-500" />} />
                            <MetricCard label="Risk Level" value={strategy.risk} icon={<ShieldCheck className="text-orange-500" />} />
                        </div>
                    </motion.div>
                ) : (
                    /* Live Trading View */
                    <motion.div
                        key="trading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1"
                    >
                        {/* Left: Main Chart (3 cols) */}
                        <Card className="lg:col-span-3 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col relative">
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                <Badge variant="secondary" className="animate-pulse bg-green-500/10 text-green-500 border-green-500/20">
                                    <Activity className="mr-1 size-3" /> LIVE MARKET
                                </Badge>
                            </div>
                            <div className="flex-1 w-full min-h-[400px] p-4 pt-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
                                        <YAxis
                                            domain={['auto', 'auto']}
                                            orientation="right"
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            tickFormatter={(val) => val.toFixed(2)}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                            itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                                            formatter={(val: number) => [val.toFixed(2), 'Price']}
                                            labelFormatter={() => ''}
                                        />
                                        <ReferenceLine y={startPrice || 0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            animationDuration={500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        {/* Right: Insight Stream (1 col) */}
                        <div className="flex flex-col gap-6 h-full">
                            <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-border/50 bg-muted/20">
                                    <h3 className="font-semibold flex items-center gap-2 text-sm">
                                        <Brain className="size-4 text-primary" />
                                        AI Insights
                                    </h3>
                                </div>
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar max-h-[400px] lg:max-h-none"
                                >
                                    <AnimatePresence initial={false}>
                                        {insights.map((insight) => (
                                            <motion.div
                                                key={insight.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="p-3 rounded-lg bg-background/80 border border-border/50 text-sm shadow-sm"
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    {insight.type === 'risk' && <ShieldCheck className="size-3 text-orange-500" />}
                                                    {insight.type === 'signal' && <Activity className="size-3 text-blue-500" />}
                                                    {insight.type === 'analysis' && <BarChart2 className="size-3 text-purple-500" />}
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold opacity-70">
                                                        {insight.type}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground ml-auto">
                                                        {new Date(insight.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-foreground/90 leading-tight">{insight.message}</p>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {status === 'trading' && (
                                        <div className="flex justify-center py-4">
                                            <div className="flex gap-1">
                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="size-1.5 rounded-full bg-primary/40" />
                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="size-1.5 rounded-full bg-primary/40" />
                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="size-1.5 rounded-full bg-primary/40" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Result Card (Appears at bottom right) */}
                            <AnimatePresence>
                                {status === 'completed' && position && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.4 }}
                                    >
                                        <Card className="border-green-500/30 bg-green-500/10 overflow-hidden">
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2 text-green-600 font-bold">
                                                        <CheckCircle2 className="size-5" />
                                                        Trade Executed
                                                    </div>
                                                    <Badge className="bg-green-600">{position.type}</Badge>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold text-green-600">
                                                        +${position.pnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                    <span className="text-sm font-medium text-green-600/80">
                                                        (+{position.pnlPercent.toFixed(2)}%)
                                                    </span>
                                                </div>
                                                <p className="mt-3 text-xs text-muted-foreground italic">
                                                    "{t("retroactive_note")}"
                                                </p>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MetricCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
            <div className="p-3 rounded-xl bg-background border border-border/50 shadow-sm">
                {icon}
            </div>
            <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="text-xl font-bold">{value}</div>
            </div>
        </Card>
    );
}
