"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Insight {
    id: string;
    type: 'bullish' | 'bearish' | 'warning' | 'info';
    message: string;
    timestamp: Date;
}

interface StreamingInsightProps {
    isActive?: boolean;
    interval?: number; // 毫秒
}

export default function StreamingInsight({ isActive = true, interval = 3000 }: StreamingInsightProps) {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [displayedInsights, setDisplayedInsights] = useState<Insight[]>([]);

    // 预设的洞察消息
    const insightTemplates = [
        { type: 'bullish' as const, message: 'RSI 指标显示超卖信号，可能出现反弹机会' },
        { type: 'info' as const, message: 'MACD 金叉形成，趋势可能转强' },
        { type: 'warning' as const, message: '当前波动率较高，建议降低仓位' },
        { type: 'bearish' as const, message: '价格触及布林带上轨，注意回调风险' },
        { type: 'bullish' as const, message: '成交量放大，多头力量增强' },
        { type: 'info' as const, message: '支撑位 $48,500 附近有较强买盘' },
        { type: 'warning' as const, message: '市场情绪指数偏高，谨慎追涨' },
        { type: 'bearish' as const, message: '短期均线下穿长期均线，趋势转弱' },
    ];

    useEffect(() => {
        if (!isActive) return;

        const addInsight = () => {
            const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];
            const newInsight: Insight = {
                id: Date.now().toString(),
                type: template.type,
                message: template.message,
                timestamp: new Date(),
            };

            setInsights(prev => [newInsight, ...prev].slice(0, 10)); // 最多保留 10 条
        };

        // 初始添加一条
        addInsight();

        // 定时添加新洞察
        const timer = setInterval(addInsight, interval);

        return () => clearInterval(timer);
    }, [isActive, interval]);

    useEffect(() => {
        // 逐个显示洞察
        if (insights.length > displayedInsights.length) {
            const timer = setTimeout(() => {
                setDisplayedInsights(insights.slice(0, displayedInsights.length + 1));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [insights, displayedInsights]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'bullish': return <TrendingUp className="size-4 text-green-500" />;
            case 'bearish': return <TrendingDown className="size-4 text-red-500" />;
            case 'warning': return <AlertTriangle className="size-4 text-yellow-500" />;
            case 'info': return <Info className="size-4 text-blue-500" />;
            default: return <Brain className="size-4" />;
        }
    };

    const getBadgeVariant = (type: string) => {
        switch (type) {
            case 'bullish': return 'default';
            case 'bearish': return 'destructive';
            case 'warning': return 'outline';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Brain className="size-4" />
                    AI 实时洞察
                </h3>
                {isActive && (
                    <Badge variant="outline" className="text-xs">
                        <span className="size-2 rounded-full bg-green-500 animate-pulse mr-2" />
                        实时更新
                    </Badge>
                )}
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                    {displayedInsights.map((insight) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, x: 20, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-3 border-border/50 bg-card/50 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getIcon(insight.type)}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm">{insight.message}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {insight.timestamp.toLocaleTimeString('zh-CN', { 
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                second: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

