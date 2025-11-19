"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StrategyCard3D from "./StrategyCard3D";
import type { Strategy } from "@/hooks/useTradingSimulation";

interface StrategyComparisonProps {
    strategies: Strategy[];
    selectedIndex: number;
    onSelectStrategy: (index: number) => void;
}

export default function StrategyComparison({
    strategies,
    selectedIndex,
    onSelectStrategy,
}: StrategyComparisonProps) {

    const handlePrevious = () => {
        if (selectedIndex > 0) {
            onSelectStrategy(selectedIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedIndex < strategies.length - 1) {
            onSelectStrategy(selectedIndex + 1);
        }
    };

    return (
        <div className="space-y-6">
            {/* 标题和导航 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">选择您的策略</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        AI 为您生成了 {strategies.length} 个策略，滑动或点击选择
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevious}
                        disabled={selectedIndex === 0}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={selectedIndex === strategies.length - 1}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>

            {/* 卡片轮播 */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: `calc(-${selectedIndex * 100}% - ${selectedIndex * 24}px)`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    {strategies.map((strategy, index) => (
                        <motion.div
                            key={strategy.id}
                            className="flex-shrink-0 w-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: index === selectedIndex ? 1 : 0.95,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <StrategyCard3D
                                strategy={strategy}
                                isSelected={index === selectedIndex}
                                onClick={() => onSelectStrategy(index)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* 指示器 */}
            <div className="flex justify-center gap-2">
                {strategies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectStrategy(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === selectedIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                        aria-label={`选择策略 ${index + 1}`}
                    />
                ))}
            </div>

            {/* 策略对比表格 */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">策略对比</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-medium text-muted-foreground">指标</th>
                                {strategies.map((strategy, index) => (
                                    <th
                                        key={strategy.id}
                                        className={`text-center py-3 px-4 font-medium ${
                                            index === selectedIndex ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                    >
                                        {strategy.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="py-3 px-4 text-muted-foreground">预期收益</td>
                                {strategies.map(s => (
                                    <td key={s.id} className="text-center py-3 px-4 font-semibold">{s.expectedReturn}</td>
                                ))}
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-3 px-4 text-muted-foreground">AI 置信度</td>
                                {strategies.map(s => (
                                    <td key={s.id} className="text-center py-3 px-4">{s.aiConfidence?.toFixed(1)}%</td>
                                ))}
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-3 px-4 text-muted-foreground">历史胜率</td>
                                {strategies.map(s => (
                                    <td key={s.id} className="text-center py-3 px-4">{s.backtestData?.winRate.toFixed(1)}%</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-muted-foreground">风险等级</td>
                                {strategies.map(s => (
                                    <td key={s.id} className="text-center py-3 px-4">{s.riskLabel}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

