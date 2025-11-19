"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, ShieldCheck } from "lucide-react";
import type { Strategy } from "@/hooks/useTradingSimulation";

interface StrategyCard3DProps {
    strategy: Strategy;
    isSelected?: boolean;
    onClick?: () => void;
}

export default function StrategyCard3D({ strategy, isSelected = false, onClick }: StrategyCard3DProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="perspective-1000 w-full h-[400px]" onClick={onClick}>
            <motion.div
                className="relative w-full h-full cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.02 }}
                onDoubleClick={() => setIsFlipped(!isFlipped)}
            >
                {/* 正面 - 策略概览 */}
                <Card
                    className={`absolute inset-0 backface-hidden p-6 ${
                        isSelected ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="flex flex-col h-full">
                        {/* 头部 */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{strategy.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                    {strategy.riskLabel}
                                </Badge>
                            </div>
                            {isSelected && (
                                <Badge className="bg-primary">已选中</Badge>
                            )}
                        </div>

                        {/* 描述 */}
                        <p className="text-sm text-muted-foreground mb-6 flex-grow">
                            {strategy.description}
                        </p>

                        {/* 关键指标 */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="size-4 text-green-500" />
                                    <span className="text-sm">预期收益</span>
                                </div>
                                <span className="font-semibold">{strategy.expectedReturn}</span>
                            </div>

                            {strategy.aiConfidence && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="flex items-center gap-2">
                                        <Target className="size-4 text-blue-500" />
                                        <span className="text-sm">AI 置信度</span>
                                    </div>
                                    <span className="font-semibold">{strategy.aiConfidence.toFixed(1)}%</span>
                                </div>
                            )}

                            {strategy.backtestData && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="size-4 text-orange-500" />
                                        <span className="text-sm">历史胜率</span>
                                    </div>
                                    <span className="font-semibold">{strategy.backtestData.winRate.toFixed(1)}%</span>
                                </div>
                            )}
                        </div>

                        {/* 提示 */}
                        <div className="mt-4 text-center text-xs text-muted-foreground">
                            双击查看详情
                        </div>
                    </div>
                </Card>

                {/* 背面 - 策略详情 */}
                <Card
                    className="absolute inset-0 backface-hidden p-6 overflow-y-auto"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-4">策略详情</h3>

                        {strategy.parameters && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground">入场条件</h4>
                                <p className="text-sm">{strategy.parameters.entryCondition}</p>

                                <h4 className="text-sm font-semibold text-muted-foreground mt-3">出场条件</h4>
                                <p className="text-sm">{strategy.parameters.exitCondition}</p>

                                <h4 className="text-sm font-semibold text-muted-foreground mt-3">止损设置</h4>
                                <p className="text-sm">{strategy.parameters.stopLoss}</p>

                                <h4 className="text-sm font-semibold text-muted-foreground mt-3">仓位管理</h4>
                                <p className="text-sm">{strategy.parameters.positionSize}</p>
                            </div>
                        )}

                        {strategy.genetics && (
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-muted-foreground mb-2">策略基因组成</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-muted rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${strategy.genetics.trendFollowing}%` }}
                                            />
                                        </div>
                                        <span className="text-xs w-20">趋势 {strategy.genetics.trendFollowing}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-muted rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${strategy.genetics.meanReversion}%` }}
                                            />
                                        </div>
                                        <span className="text-xs w-20">回归 {strategy.genetics.meanReversion}%</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 text-center text-xs text-muted-foreground">
                            双击返回
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

