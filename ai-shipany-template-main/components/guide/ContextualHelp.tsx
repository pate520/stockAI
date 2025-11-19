"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContextualHelpProps {
    title: string;
    content: string;
    tips?: string[];
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function ContextualHelp({ 
    title, 
    content, 
    tips = [],
    position = 'bottom' 
}: ContextualHelpProps) {
    const [isOpen, setIsOpen] = useState(false);

    const positionClasses = {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
    };

    return (
        <div className="relative inline-block">
            {/* 触发按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="size-5 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="帮助"
            >
                <HelpCircle className="size-3.5" />
            </button>

            {/* 帮助卡片 */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 遮罩层 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* 帮助内容 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute ${positionClasses[position]} z-50 w-80`}
                        >
                            <Card className="p-4 shadow-lg border-border/50 bg-card backdrop-blur-sm">
                                {/* 头部 */}
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-semibold text-sm">{title}</h4>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="size-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <X className="size-3.5" />
                                    </button>
                                </div>

                                {/* 内容 */}
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                    {content}
                                </p>

                                {/* 提示列表 */}
                                {tips.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="text-xs font-medium text-muted-foreground">
                                            💡 小贴士：
                                        </div>
                                        <ul className="space-y-1.5">
                                            {tips.map((tip, index) => (
                                                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary mt-0.5">•</span>
                                                    <span className="flex-1">{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* 箭头指示器 */}
                                <div 
                                    className={`absolute size-3 bg-card border-border/50 rotate-45 ${
                                        position === 'bottom' ? '-top-1.5 left-4 border-t border-l' :
                                        position === 'top' ? '-bottom-1.5 left-4 border-b border-r' :
                                        position === 'right' ? '-left-1.5 top-4 border-t border-l' :
                                        '-right-1.5 top-4 border-b border-r'
                                    }`}
                                />
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

