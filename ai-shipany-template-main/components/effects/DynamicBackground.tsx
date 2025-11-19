"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
    priceChange?: number; // 价格变化百分比，正数为涨，负数为跌
}

export default function DynamicBackground({ priceChange = 0 }: DynamicBackgroundProps) {
    const [gradientColors, setGradientColors] = useState({
        from: "rgba(139, 92, 246, 0.1)", // 默认紫色
        to: "rgba(59, 130, 246, 0.1)",
    });

    useEffect(() => {
        if (priceChange > 0) {
            // 上涨：绿色渐变
            setGradientColors({
                from: "rgba(34, 197, 94, 0.15)",
                to: "rgba(16, 185, 129, 0.1)",
            });
        } else if (priceChange < 0) {
            // 下跌：红色渐变
            setGradientColors({
                from: "rgba(239, 68, 68, 0.15)",
                to: "rgba(220, 38, 38, 0.1)",
            });
        } else {
            // 中性：紫色渐变
            setGradientColors({
                from: "rgba(139, 92, 246, 0.1)",
                to: "rgba(59, 130, 246, 0.1)",
            });
        }
    }, [priceChange]);

    return (
        <motion.div
            className="fixed inset-0 -z-20"
            animate={{
                background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
            }}
        />
    );
}

