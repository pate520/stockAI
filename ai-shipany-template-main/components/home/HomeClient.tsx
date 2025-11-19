"use client";

import { useTradingSimulation } from "@/hooks/useTradingSimulation";
import StrategyInputHero from "@/components/home/StrategyInputHero";
import TradingDashboard from "@/components/dashboard/TradingDashboard";
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
        startPrice,
        currentPrice,
        position,
        generateStrategy,
        startTrading,
        completeTrade,
    } = useTradingSimulation();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Swaps between Input and Dashboard */}
            {status === 'idle' || status === 'generating' ? (
                <StrategyInputHero
                    onGenerate={generateStrategy}
                    isGenerating={status === 'generating'}
                />
            ) : (
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

            {/* Keep some original sections for credibility, but maybe hide them when trading? 
          For now, let's keep them to make the page look full. */}
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
    );
}
