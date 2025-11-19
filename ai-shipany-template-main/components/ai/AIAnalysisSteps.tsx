"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, Shield, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import TypewriterText from "../interactive/TypewriterText";

interface AnalysisStep {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    dataPoints?: string;
}

interface AIAnalysisStepsProps {
    onComplete?: () => void;
}

export default function AIAnalysisSteps({ onComplete }: AIAnalysisStepsProps) {
    const steps: AnalysisStep[] = [
        {
            id: "data",
            icon: <Database className="size-5" />,
            title: "正在分析市场数据",
            description: "收集并处理实时市场数据，包括价格走势、交易量、波动率等关键指标...",
            dataPoints: "已分析 1,234 条历史数据",
        },
        {
            id: "signals",
            icon: <TrendingUp className="size-5" />,
            title: "识别交易信号",
            description: "运用机器学习算法识别潜在的交易机会，分析技术指标和市场模式...",
            dataPoints: "检测到 15 个交易信号",
        },
        {
            id: "risk",
            icon: <Shield className="size-5" />,
            title: "评估风险等级",
            description: "计算风险收益比，评估市场波动性，确定最优止损止盈位置...",
            dataPoints: "风险评分: 7.2/10",
        },
        {
            id: "strategy",
            icon: <Sparkles className="size-5" />,
            title: "生成策略参数",
            description: "基于分析结果生成个性化交易策略，优化入场出场条件和仓位管理...",
            dataPoints: "生成 3 个策略方案",
        },
    ];

    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.5 }}
                >
                    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            {/* 图标 */}
                            <div className="flex-shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {step.icon}
                            </div>

                            {/* 内容 */}
                            <div className="flex-grow space-y-2">
                                <h4 className="font-semibold">{step.title}</h4>
                                <div className="text-sm text-muted-foreground">
                                    <TypewriterText 
                                        text={step.description}
                                        speed={80}
                                    />
                                </div>
                                {step.dataPoints && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.5 + 1 }}
                                        className="text-xs text-primary font-mono"
                                    >
                                        {step.dataPoints}
                                    </motion.div>
                                )}
                            </div>

                            {/* 进度指示 */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.5 + 1.5 }}
                                className="flex-shrink-0"
                            >
                                <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            ))}

            {/* 完成提示 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: steps.length * 0.5 + 0.5 }}
                className="text-center py-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                    <Sparkles className="size-4" />
                    <span>AI 策略生成完成！</span>
                </div>
            </motion.div>
        </div>
    );
}

