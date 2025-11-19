import { useState, useEffect, useCallback } from 'react';
import { getBTCPrice, MarketPrice } from '@/services/marketData';

export type TradingStatus = 'idle' | 'generating' | 'ready' | 'trading' | 'completed';

export interface Strategy {
    id: string;
    name: string;
    description: string;
    risk: 'Low' | 'Medium' | 'High';
    expectedReturn: string;
}

export interface Position {
    type: 'LONG' | 'SHORT';
    entryPrice: number;
    exitPrice: number; // Current price for open position
    pnl: number;
    pnlPercent: number;
    timestamp: number;
}

const PRESET_STRATEGIES: Strategy[] = [
    {
        id: 'trend_following',
        name: 'AI Trend Follower V3',
        description: 'Identifies momentum in short-term price movements using LSTM networks.',
        risk: 'Medium',
        expectedReturn: '15-25% APY',
    },
    {
        id: 'mean_reversion',
        name: 'Mean Reversion Alpha',
        description: 'Capitalizes on overbought/oversold conditions using RSI divergence.',
        risk: 'High',
        expectedReturn: '30-50% APY',
    },
    {
        id: 'arbitrage',
        name: 'Statistical Arbitrage Bot',
        description: 'Exploits price inefficiencies across multiple timeframes.',
        risk: 'Low',
        expectedReturn: '5-10% APY',
    },
];

export function useTradingSimulation() {
    const [status, setStatus] = useState<TradingStatus>('idle');
    const [strategy, setStrategy] = useState<Strategy | null>(null);
    const [startPrice, setStartPrice] = useState<number | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Poll for price updates
    useEffect(() => {
        let interval: NodeJS.Timeout;

        const fetchPrice = async () => {
            const data = await getBTCPrice();
            setCurrentPrice(data.price);

            // If trading, update position PnL in real-time (simulated)
            if (status === 'trading' && startPrice && position) {
                // This is just for display during the "waiting" phase if we wanted to show something,
                // but for "Post-calculation", we usually reveal the position at the end.
                // However, to make it look alive, we can update the "current price" display.
            }
        };

        fetchPrice();
        interval = setInterval(fetchPrice, 2000); // Update every 2s

        return () => clearInterval(interval);
    }, [status, startPrice, position]);

    const generateStrategy = useCallback(async (input: string) => {
        setStatus('generating');
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Select a random strategy or based on keyword
        const randomStrategy = PRESET_STRATEGIES[Math.floor(Math.random() * PRESET_STRATEGIES.length)];
        setStrategy(randomStrategy);
        setStatus('ready');
    }, []);

    const startTrading = useCallback(async () => {
        if (!currentPrice) return;

        setStatus('trading');
        setStartPrice(currentPrice);
        setStartTime(Date.now());

        // In a real app, we would wait 10 mins. 
        // Here we set a timeout to "finish" the trade and reveal the "post-calculated" result.
        // For demo purposes, let's say 10 seconds = 10 minutes.
        // OR we provide a "Fast Forward" function.
    }, [currentPrice]);

    const completeTrade = useCallback(async () => {
        if (!startPrice || !currentPrice || !startTime) return;

        // Post-calculation Logic:
        // Determine direction based on price movement to ensure profit.
        const priceDiff = currentPrice - startPrice;
        const isProfit = priceDiff > 0; // If price went up, we want to be LONG.

        // If price went DOWN (diff < 0), we want to be SHORT to be profitable.
        // If price is exactly same, default to LONG.

        let type: 'LONG' | 'SHORT' = 'LONG';
        if (priceDiff < 0) {
            type = 'SHORT';
        }

        // Calculate PnL
        // If LONG: (Current - Entry) / Entry
        // If SHORT: (Entry - Current) / Entry
        let pnlPercent = 0;
        if (type === 'LONG') {
            pnlPercent = (currentPrice - startPrice) / startPrice;
        } else {
            pnlPercent = (startPrice - currentPrice) / startPrice;
        }

        // Add some leverage or multiplier for effect? No, keep it simple for now.
        const pnl = pnlPercent * 10000; // Assuming $10k position size for demo

        setPosition({
            type,
            entryPrice: startPrice,
            exitPrice: currentPrice,
            pnl,
            pnlPercent: pnlPercent * 100,
            timestamp: startTime,
        });

        setStatus('completed');
    }, [startPrice, currentPrice, startTime]);

    return {
        status,
        strategy,
        startPrice,
        currentPrice,
        position,
        startTime,
        generateStrategy,
        startTrading,
        completeTrade,
    };
}
