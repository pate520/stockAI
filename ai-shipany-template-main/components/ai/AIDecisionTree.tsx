"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DecisionNode {
    id: string;
    label: string;
    type: 'analysis' | 'decision' | 'action';
    status: 'completed' | 'active' | 'pending';
    children?: DecisionNode[];
}

interface AIDecisionTreeProps {
    strategyName: string;
}

export default function AIDecisionTree({ strategyName }: AIDecisionTreeProps) {
    // 模拟决策树数据
    const decisionTree: DecisionNode = {
        id: '1',
        label: '市场数据分析',
        type: 'analysis',
        status: 'completed',
        children: [
            {
                id: '2',
                label: '技术指标评估',
                type: 'analysis',
                status: 'completed',
                children: [
                    {
                        id: '4',
                        label: '趋势确认',
                        type: 'decision',
                        status: 'completed',
                        children: [
                            {
                                id: '6',
                                label: '生成交易信号',
                                type: 'action',
                                status: 'completed',
                            },
                        ],
                    },
                ],
            },
            {
                id: '3',
                label: '风险评估',
                type: 'analysis',
                status: 'completed',
                children: [
                    {
                        id: '5',
                        label: '仓位计算',
                        type: 'decision',
                        status: 'completed',
                        children: [
                            {
                                id: '7',
                                label: '执行策略',
                                type: 'action',
                                status: 'active',
                            },
                        ],
                    },
                ],
            },
        ],
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'analysis': return <Brain className="size-4" />;
            case 'decision': return <AlertCircle className="size-4" />;
            case 'action': return <TrendingUp className="size-4" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/50';
            case 'active': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
            case 'pending': return 'bg-muted text-muted-foreground border-border';
            default: return '';
        }
    };

    const renderNode = (node: DecisionNode, level: number = 0) => (
        <div key={node.id} className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: level * 0.1 }}
            >
                <Card className={`p-3 border ${getStatusColor(node.status)} min-w-[180px]`}>
                    <div className="flex items-center gap-2">
                        {getIcon(node.type)}
                        <span className="text-sm font-medium">{node.label}</span>
                        {node.status === 'completed' && (
                            <CheckCircle2 className="size-3 ml-auto" />
                        )}
                    </div>
                </Card>
            </motion.div>

            {node.children && node.children.length > 0 && (
                <>
                    {/* 连接线 */}
                    <div className="w-px h-8 bg-border my-2" />
                    
                    {/* 子节点 */}
                    <div className="flex gap-8">
                        {node.children.map(child => (
                            <div key={child.id} className="flex flex-col items-center">
                                {renderNode(child, level + 1)}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">AI 决策流程</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {strategyName} 的智能分析过程
                </p>
            </div>

            {/* 决策树可视化 */}
            <div className="overflow-x-auto pb-4">
                <div className="inline-flex justify-center min-w-full p-8">
                    {renderNode(decisionTree)}
                </div>
            </div>

            {/* 图例 */}
            <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">已完成</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">进行中</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-muted" />
                    <span className="text-muted-foreground">待处理</span>
                </div>
            </div>
        </div>
    );
}

