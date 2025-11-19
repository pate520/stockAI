"use client";

import { useTradingSimulation } from "@/hooks/useTradingSimulation";
import StrategyInputHero from "@/components/home/StrategyInputHero";
import TradingDashboard from "@/components/dashboard/TradingDashboard";
import StrategyReadyPage from "@/components/strategy/StrategyReadyPage";
import AIAnalysisSteps from "@/components/ai/AIAnalysisSteps";
import ParticleBackground from "@/components/effects/ParticleBackground";
import Feature from "@/components/blocks/feature";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import Stats from "@/components/blocks/stats";
import CTA from "@/components/blocks/cta";

// Define types for the page data if needed, or just accept 'any' for now to match existing structure
// The original page passed 'page' object.
interface HomeClientProps {
    pageData: any;
}

export default function HomeClient({ pageData }: HomeClientProps) {
    const {
        status,
        strategy,
        strategies,
        selectedStrategyIndex,
        startPrice,
        currentPrice,
        position,
        generateStrategy,
        selectStrategy,
        startTrading,
        completeTrade,
    } = useTradingSimulation();

    // 计算价格变化百分比（用于动态背景）
    const priceChange = startPrice && currentPrice
        ? ((currentPrice - startPrice) / startPrice) * 100
        : 0;

    return (
        <>
            {/* 背景效果 */}
            <ParticleBackground />

            <div className="min-h-screen relative">
                {/* 主内容区域 */}
                <div className="relative z-10">
                {/* 输入阶段 */}
                {status === 'idle' && (
                    <StrategyInputHero
                        onGenerate={generateStrategy}
                        isGenerating={false}
                    />
                )}

                {/* 生成中阶段 */}
                {status === 'generating' && (
                    <div className="min-h-screen flex items-center justify-center py-12 px-4">
                        <div className="max-w-2xl w-full">
                            <AIAnalysisSteps />
                        </div>
                    </div>
                )}

                {/* 策略就绪阶段 */}
                {status === 'ready' && strategies.length > 0 && (
                    <StrategyReadyPage
                        strategies={strategies}
                        selectedIndex={selectedStrategyIndex}
                        onSelectStrategy={selectStrategy}
                        onStartTrading={startTrading}
                    />
                )}

                {/* 交易中和完成阶段 */}
                {(status === 'trading' || status === 'completed') && strategy && (
                    <TradingDashboard
                        status={status}
                        strategy={strategy}
                        startPrice={startPrice}
                        currentPrice={currentPrice}
                        position={position}
                        onStartTrading={startTrading}
                        onCompleteTrade={completeTrade}
                    />
                )}

                {/* 原有的营销内容（仅在 idle 状态显示） */}
                {status === 'idle' && (
                    <>
                        {pageData.introduce && <Feature1 section={pageData.introduce} />}
                        {pageData.stats && <Stats section={pageData.stats} />}
                        {pageData.benefit && <Feature2 section={pageData.benefit} />}
                        {pageData.usage && <Feature3 section={pageData.usage} />}
                        {pageData.feature && <Feature section={pageData.feature} />}
                        {pageData.cta && <CTA section={pageData.cta} />}
                    </>
                )}
                </div>
            </div>
        </>
    );
}
