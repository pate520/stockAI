"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, TrendingUp, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface Suggestion {
    id: string;
    icon: React.ReactNode;
    category: string;
    text: string;
    tags: string[];
}

interface SmartSuggestionsProps {
    onSelectSuggestion?: (text: string) => void;
}

export default function SmartSuggestions({ onSelectSuggestion }: SmartSuggestionsProps) {
    const t = useTranslations('smart_suggestions');

    const suggestions: Suggestion[] = [
        {
            id: '1',
            icon: <TrendingUp className="size-4" />,
            category: t('templates.trend_following.title'),
            text: t('templates.trend_following.text'),
            tags: ['Trend', 'MA'],
        },
        {
            id: '2',
            icon: <Shield className="size-4" />,
            category: t('templates.conservative.title'),
            text: t('templates.conservative.text'),
            tags: ['RSI', 'Low Risk'],
        },
        {
            id: '3',
            icon: <Zap className="size-4" />,
            category: t('templates.momentum.title'),
            text: t('templates.momentum.text'),
            tags: ['MACD', 'Momentum'],
        },
        {
            id: '4',
            icon: <TrendingUp className="size-4" />,
            category: t('templates.mean_reversion.title'),
            text: t('templates.mean_reversion.text'),
            tags: ['Bollinger', 'Mean Reversion'],
        },
        {
            id: '5',
            icon: <Shield className="size-4" />,
            category: t('templates.breakout.title'),
            text: t('templates.breakout.text'),
            tags: ['Breakout', 'Volume'],
        },
        {
            id: '6',
            icon: <Zap className="size-4" />,
            category: t('templates.volatility.title'),
            text: t('templates.volatility.text'),
            tags: ['ATR', 'Volatility'],
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-yellow-500" />
                <h3 className="text-sm font-semibold">{t('title')}</h3>
                <Badge variant="outline" className="text-xs">{t('subtitle')}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <AnimatePresence>
                    {suggestions.map((suggestion, index) => (
                        <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card
                                className="p-4 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
                                onClick={() => onSelectSuggestion?.(suggestion.text)}
                            >
                                <div className="space-y-3">
                                    {/* 头部 */}
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            {suggestion.icon}
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {suggestion.category}
                                        </span>
                                    </div>

                                    {/* 建议文本 */}
                                    <p className="text-sm leading-relaxed">
                                        {suggestion.text}
                                    </p>

                                    {/* 标签 */}
                                    <div className="flex flex-wrap gap-2">
                                        {suggestion.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 提示 */}
            <p className="text-xs text-muted-foreground text-center">
                {t('hint')}
            </p>
        </div>
    );
}

