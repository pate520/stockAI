"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CandleData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandlestickChartProps {
    data?: CandleData[];
    height?: number;
}

// 生成模拟 K 线数据
function generateMockCandleData(): CandleData[] {
    const data: CandleData[] = [];
    let basePrice = 50000;
    const now = new Date();

    for (let i = 100; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        const open = basePrice;
        const change = (Math.random() - 0.5) * 1000;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 200;
        const low = Math.min(open, close) - Math.random() * 200;

        data.push({
            time: date.toISOString().slice(11, 16),
            open,
            high,
            low,
            close,
        });

        basePrice = close;
    }

    return data;
}

export default function CandlestickChart({ data, height = 400 }: CandlestickChartProps) {
    const chartData = data || generateMockCandleData();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">价格走势</h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="size-3 bg-green-500 rounded" />
                        <span className="text-muted-foreground">上涨</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 bg-red-500 rounded" />
                        <span className="text-muted-foreground">下跌</span>
                    </div>
                </div>
            </div>
            <div className="w-full rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="time"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="high"
                            stroke="#22c55e"
                            strokeWidth={1}
                            dot={false}
                            opacity={0.3}
                        />
                        <Line
                            type="monotone"
                            dataKey="low"
                            stroke="#ef4444"
                            strokeWidth={1}
                            dot={false}
                            opacity={0.3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

