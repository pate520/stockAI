"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { BacktestData } from "@/hooks/useTradingSimulation";
import { Button } from "@/components/ui/button";

interface BacktestChartProps {
    backtestData: BacktestData;
}

export default function BacktestChart({ backtestData }: BacktestChartProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<'30d' | '90d' | '180d'>('30d');

    return (
        <div className="space-y-4">
            {/* 时间范围选择器 */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">回测表现</h3>
                <div className="flex gap-2">
                    <Button
                        variant={selectedPeriod === '30d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedPeriod('30d')}
                    >
                        30天
                    </Button>
                    <Button
                        variant={selectedPeriod === '90d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedPeriod('90d')}
                    >
                        90天
                    </Button>
                    <Button
                        variant={selectedPeriod === '180d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedPeriod('180d')}
                    >
                        180天
                    </Button>
                </div>
            </div>

            {/* 图表容器 */}
            <div className="w-full h-[300px] rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={backtestData.data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="date"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `${value.toFixed(1)}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px'
                            }}
                            formatter={(value: number) => [`${value.toFixed(2)}%`, '收益率']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* 关键指标 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">胜率</div>
                    <div className="text-lg font-semibold text-green-500">
                        {backtestData.winRate.toFixed(1)}%
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">夏普比率</div>
                    <div className="text-lg font-semibold">
                        {backtestData.sharpeRatio.toFixed(2)}
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">最大回撤</div>
                    <div className="text-lg font-semibold text-red-500">
                        -{backtestData.maxDrawdown.toFixed(1)}%
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">总交易次数</div>
                    <div className="text-lg font-semibold">
                        {backtestData.totalTrades}
                    </div>
                </div>
            </div>
        </div>
    );
}

