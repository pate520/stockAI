"use client";

import type { TechnicalIndicators as TechnicalIndicatorsType } from "@/hooks/useTradingSimulation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechnicalIndicatorsProps {
    indicators: TechnicalIndicatorsType;
}

export default function TechnicalIndicators({ indicators }: TechnicalIndicatorsProps) {
    // RSI 信号颜色
    const getRSIColor = (signal: string) => {
        switch (signal) {
            case 'overbought': return 'text-red-500';
            case 'oversold': return 'text-green-500';
            default: return 'text-yellow-500';
        }
    };

    // MACD 趋势图标
    const getMACDIcon = (trend: string) => {
        switch (trend) {
            case 'bullish': return <TrendingUp className="size-4 text-green-500" />;
            case 'bearish': return <TrendingDown className="size-4 text-red-500" />;
            default: return <Minus className="size-4 text-yellow-500" />;
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold">技术指标</h3>

            {/* RSI 指标 */}
            <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">RSI</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="size-3 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs max-w-xs">
                                        相对强弱指标，用于衡量价格变动的速度和幅度。
                                        RSI &gt; 70 为超买，RSI &lt; 30 为超卖。
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Badge variant="outline" className={getRSIColor(indicators.rsi.signal)}>
                        {indicators.rsi.signal === 'overbought' ? '超买' : 
                         indicators.rsi.signal === 'oversold' ? '超卖' : '中性'}
                    </Badge>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">当前值</span>
                        <span className={`font-semibold ${getRSIColor(indicators.rsi.signal)}`}>
                            {indicators.rsi.value.toFixed(1)}
                        </span>
                    </div>
                    {/* RSI 进度条 */}
                    <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className={`absolute h-full transition-all ${
                                indicators.rsi.signal === 'overbought' ? 'bg-red-500' :
                                indicators.rsi.signal === 'oversold' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${indicators.rsi.value}%` }}
                        />
                        {/* 超买超卖线 */}
                        <div className="absolute left-[30%] top-0 w-px h-full bg-border" />
                        <div className="absolute left-[70%] top-0 w-px h-full bg-border" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>30</span>
                        <span>70</span>
                        <span>100</span>
                    </div>
                </div>
            </Card>

            {/* MACD 指标 */}
            <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">MACD</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="size-3 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs max-w-xs">
                                        平滑异同移动平均线，用于判断趋势方向和强度。
                                        柱状图为正表示看涨，为负表示看跌。
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-1">
                        {getMACDIcon(indicators.macd.trend)}
                        <span className="text-xs">
                            {indicators.macd.trend === 'bullish' ? '看涨' :
                             indicators.macd.trend === 'bearish' ? '看跌' : '中性'}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                        <div className="text-xs text-muted-foreground">MACD</div>
                        <div className="font-semibold">{indicators.macd.value.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">信号线</div>
                        <div className="font-semibold">{indicators.macd.signal.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">柱状图</div>
                        <div className={`font-semibold ${indicators.macd.histogram > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {indicators.macd.histogram.toFixed(2)}
                        </div>
                    </div>
                </div>
            </Card>

            {/* 布林带指标 */}
            <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">布林带</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="size-3 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs max-w-xs">
                                        布林带由上轨、中轨、下轨组成，用于衡量价格波动范围。
                                        价格触及上轨可能回调，触及下轨可能反弹。
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Badge variant="outline">
                        {indicators.bollingerBands.position === 'above' ? '上轨上方' :
                         indicators.bollingerBands.position === 'below' ? '下轨下方' : '带内'}
                    </Badge>
                </div>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">上轨</span>
                        <span className="font-mono">${indicators.bollingerBands.upper.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">中轨</span>
                        <span className="font-mono">${indicators.bollingerBands.middle.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">下轨</span>
                        <span className="font-mono">${indicators.bollingerBands.lower.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border/50">
                        <span className="text-muted-foreground">当前价格</span>
                        <span className="font-mono font-semibold">${indicators.currentPrice.toFixed(2)}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

