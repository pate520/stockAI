"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingStep {
    id: string;
    label: string;
    duration: number; // 毫秒
}

interface ProgressiveLoaderProps {
    steps: LoadingStep[];
    onComplete?: () => void;
}

export default function ProgressiveLoader({ steps, onComplete }: ProgressiveLoaderProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentStepIndex >= steps.length) {
            onComplete?.();
            return;
        }

        const currentStep = steps[currentStepIndex];
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const stepProgress = Math.min((elapsed / currentStep.duration) * 100, 100);
            setProgress(stepProgress);

            if (stepProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentStepIndex(prev => prev + 1);
                    setProgress(0);
                }, 200);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [currentStepIndex, steps, onComplete]);

    const totalProgress = ((currentStepIndex + progress / 100) / steps.length) * 100;

    return (
        <div className="space-y-6">
            {/* 总进度条 */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI 策略生成中...</span>
                    <span className="font-semibold">{Math.round(totalProgress)}%</span>
                </div>
                <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${totalProgress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* 步骤列表 */}
            <div className="space-y-3">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isPending = index > currentStepIndex;

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                                isCurrent ? 'bg-primary/10 border border-primary/20' : 
                                isCompleted ? 'bg-muted/50' : 'bg-muted/20'
                            }`}
                        >
                            {/* 状态图标 */}
                            <div className="flex-shrink-0">
                                {isCompleted && (
                                    <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                                        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                {isCurrent && (
                                    <Loader2 className="size-6 text-primary animate-spin" />
                                )}
                                {isPending && (
                                    <div className="size-6 rounded-full border-2 border-muted-foreground/30" />
                                )}
                            </div>

                            {/* 步骤标签 */}
                            <div className="flex-grow">
                                <div className={`text-sm font-medium ${
                                    isCurrent ? 'text-primary' : 
                                    isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                    {step.label}
                                </div>
                                {isCurrent && (
                                    <div className="mt-1 w-full h-1 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 完成时间 */}
                            {isCompleted && (
                                <div className="text-xs text-muted-foreground">
                                    {(step.duration / 1000).toFixed(1)}s
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

