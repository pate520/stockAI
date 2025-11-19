"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import StrategyComparison from "./StrategyComparison";
import BacktestChart from "../charts/BacktestChart";
import TechnicalIndicators from "../indicators/TechnicalIndicators";
import AIDecisionTree from "../ai/AIDecisionTree";
import type { Strategy } from "@/hooks/useTradingSimulation";

interface StrategyReadyPageProps {
    strategies: Strategy[];
    selectedIndex: number;
    onSelectStrategy: (index: number) => void;
    onStartTrading: () => void;
}

export default function StrategyReadyPage({
    strategies,
    selectedIndex,
    onSelectStrategy,
    onStartTrading,
}: StrategyReadyPageProps) {
    const selectedStrategy = strategies[selectedIndex];

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* 头部标题 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                        <Sparkles className="size-4" />
                        <span>AI 策略生成完成</span>
                    </div>
                    <h1 className="text-4xl font-bold">您的专属交易策略已就绪</h1>
                    <p className="text-muted-foreground text-lg">
                        AI 已为您生成 {strategies.length} 个策略方案，请选择最适合您的策略开始交易
                    </p>
                </motion.div>

                {/* 策略对比轮播 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    data-tour="strategy-cards"
                >
                    <StrategyComparison
                        strategies={strategies}
                        selectedIndex={selectedIndex}
                        onSelectStrategy={onSelectStrategy}
                    />
                </motion.div>

                {/* 详细信息网格 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* 左侧：回测图表 */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedStrategy.backtestData && (
                            <div data-tour="backtest-chart">
                                <BacktestChart backtestData={selectedStrategy.backtestData} />
                            </div>
                        )}

                        {/* AI 决策树 */}
                        <AIDecisionTree strategyName={selectedStrategy.name} />
                    </div>

                    {/* 右侧：技术指标 */}
                    <div className="space-y-6">
                        {selectedStrategy.technicalIndicators && (
                            <div data-tour="technical-indicators">
                                <TechnicalIndicators indicators={selectedStrategy.technicalIndicators} />
                            </div>
                        )}

                        {/* AI 分析报告 */}
                        {selectedStrategy.aiAnalysis && (
                            <div className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm space-y-3">
                                <h3 className="text-sm font-semibold">AI 分析报告</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedStrategy.aiAnalysis}
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* 启动按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center pt-8"
                    data-tour="start-trading"
                >
                    <Button
                        size="lg"
                        onClick={onStartTrading}
                        className="text-lg px-8 py-6 group"
                    >
                        <span>启动 AI 交易代理</span>
                        <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>

                {/* 底部提示 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-muted-foreground"
                >
                    <p>💡 这是模拟交易环境，所有交易均为虚拟操作，不涉及真实资金</p>
                </motion.div>
            </div>
        </div>
    );
}

