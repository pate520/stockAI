import { useState, useEffect, useCallback } from 'react';
import { getBTCPrice } from '@/services/marketData';
import { useTranslations } from 'next-intl';

export type TradingStatus = 'idle' | 'generating' | 'ready' | 'trading' | 'completed';

export type RiskLevel = 'low' | 'medium' | 'high';

// 回测数据点
export interface BacktestDataPoint {
    date: string;
    value: number; // 累计收益率 (%)
}

// 回测数据
export interface BacktestData {
    period: '30d' | '90d' | '180d';
    data: BacktestDataPoint[];
    winRate: number; // 胜率 (%)
    sharpeRatio: number; // 夏普比率
    maxDrawdown: number; // 最大回撤 (%)
    totalTrades: number; // 总交易次数
    avgReturn: number; // 平均收益 (%)
    bestTrade: number; // 最佳交易收益 (%)
    worstTrade: number; // 最差交易收益 (%)
}

// 技术指标
export interface TechnicalIndicators {
    rsi: {
        value: number; // 0-100
        signal: 'overbought' | 'oversold' | 'neutral'; // 超买/超卖/中性
    };
    macd: {
        value: number;
        signal: number;
        histogram: number;
        trend: 'bullish' | 'bearish' | 'neutral'; // 看涨/看跌/中性
    };
    bollingerBands: {
        upper: number;
        middle: number;
        lower: number;
        position: 'above' | 'below' | 'inside'; // 价格相对位置
    };
    currentPrice: number;
}

// AI 分析步骤
export interface AIAnalysisStep {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'processing' | 'completed';
    progress: number; // 0-100
    dataPoints?: number; // 可选：分析的数据点数量
}

// 策略参数
export interface StrategyParameters {
    entryCondition: string; // 入场条件
    exitCondition: string; // 出场条件
    stopLoss: string; // 止损设置
    takeProfit: string; // 止盈设置
    positionSize: string; // 仓位管理
}

// 策略基因组成
export interface StrategyGenetics {
    trendFollowing: number; // 趋势跟踪占比 (%)
    meanReversion: number; // 均值回归占比 (%)
    momentum: number; // 动量策略占比 (%)
    volatility: number; // 波动率策略占比 (%)
}

export interface Strategy {
    id: string;
    name: string;
    description: string;
    riskLevel: RiskLevel;
    riskLabel: string;
    expectedReturn: string;
    // 新增字段
    backtestData?: BacktestData; // 回测数据
    technicalIndicators?: TechnicalIndicators; // 技术指标
    parameters?: StrategyParameters; // 策略参数
    genetics?: StrategyGenetics; // 策略基因
    aiConfidence?: number; // AI 置信度 (%)
    marketAdaptability?: number; // 市场适配度 (%)
    aiAnalysis?: string; // AI 分析报告
}

export interface Position {
    type: 'LONG' | 'SHORT';
    entryPrice: number;
    exitPrice: number; // Current price for open position
    pnl: number;
    pnlPercent: number;
    timestamp: number;
}

type PresetStrategy = {
    id: string;
    riskLevel: RiskLevel;
};

const PRESET_STRATEGIES: PresetStrategy[] = [
    {
        id: 'trend_following',
        riskLevel: 'medium',
    },
    {
        id: 'mean_reversion',
        riskLevel: 'high',
    },
    {
        id: 'arbitrage',
        riskLevel: 'low',
    },
];

// 生成模拟回测数据
function generateBacktestData(period: '30d' | '90d' | '180d', baseReturn: number): BacktestData {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 180;
    const data: BacktestDataPoint[] = [];

    let cumulative = 0;
    for (let i = 0; i < days; i++) {
        const dailyReturn = (Math.random() - 0.3) * 2 + baseReturn / days; // 带有趋势的随机波动
        cumulative += dailyReturn;
        data.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: cumulative,
        });
    }

    return {
        period,
        data,
        winRate: 60 + Math.random() * 20, // 60-80%
        sharpeRatio: 1.2 + Math.random() * 1.3, // 1.2-2.5
        maxDrawdown: 5 + Math.random() * 15, // 5-20%
        totalTrades: Math.floor(days / 3) + Math.floor(Math.random() * 10),
        avgReturn: baseReturn / (days / 7), // 周平均收益
        bestTrade: 5 + Math.random() * 10, // 5-15%
        worstTrade: -(2 + Math.random() * 5), // -2% to -7%
    };
}

// 生成技术指标
function generateTechnicalIndicators(currentPrice: number): TechnicalIndicators {
    const rsiValue = 30 + Math.random() * 40; // 30-70
    const macdValue = (Math.random() - 0.5) * 100;

    return {
        rsi: {
            value: rsiValue,
            signal: rsiValue > 70 ? 'overbought' : rsiValue < 30 ? 'oversold' : 'neutral',
        },
        macd: {
            value: macdValue,
            signal: macdValue * 0.9,
            histogram: macdValue * 0.1,
            trend: macdValue > 0 ? 'bullish' : macdValue < -20 ? 'bearish' : 'neutral',
        },
        bollingerBands: {
            upper: currentPrice * 1.02,
            middle: currentPrice,
            lower: currentPrice * 0.98,
            position: Math.random() > 0.5 ? 'inside' : 'above',
        },
        currentPrice,
    };
}

// 生成策略参数
function generateStrategyParameters(strategyId: string): StrategyParameters {
    const params: Record<string, StrategyParameters> = {
        trend_following: {
            entryCondition: '价格突破20日均线 + 成交量放大1.5倍',
            exitCondition: '跌破5日均线 或 止盈达到8%',
            stopLoss: '入场价格下方5%',
            takeProfit: '入场价格上方8%',
            positionSize: '初始仓位30%，盈利后加仓至50%',
        },
        mean_reversion: {
            entryCondition: 'RSI < 30 且价格触及布林带下轨',
            exitCondition: 'RSI > 50 或 价格回归均线',
            stopLoss: '入场价格下方3%',
            takeProfit: '入场价格上方5%',
            positionSize: '固定仓位40%',
        },
        arbitrage: {
            entryCondition: '检测到跨交易所价差 > 0.5%',
            exitCondition: '价差收敛至 < 0.1%',
            stopLoss: '价差扩大至 > 1%',
            takeProfit: '价差收敛完成',
            positionSize: '高频小仓位，单次20%',
        },
    };
    return params[strategyId] || params.trend_following;
}

// 生成策略基因
function generateStrategyGenetics(strategyId: string): StrategyGenetics {
    const genetics: Record<string, StrategyGenetics> = {
        trend_following: {
            trendFollowing: 70,
            meanReversion: 10,
            momentum: 15,
            volatility: 5,
        },
        mean_reversion: {
            trendFollowing: 15,
            meanReversion: 60,
            momentum: 10,
            volatility: 15,
        },
        arbitrage: {
            trendFollowing: 5,
            meanReversion: 20,
            momentum: 25,
            volatility: 50,
        },
    };
    return genetics[strategyId] || genetics.trend_following;
}

// 生成 AI 分析报告
function generateAIAnalysis(strategyId: string, t: any): string {
    const analyses: Record<string, string> = {
        trend_following: '基于当前市场环境分析，BTC 正处于上升趋势通道中。技术指标显示动量强劲，建议采用趋势跟踪策略。止损设置在5%以控制风险，预期该策略在当前市场条件下有较高的成功概率。',
        mean_reversion: '市场近期波动加剧，价格多次触及超卖区域后反弹。均值回归策略在此环境下表现优异。建议在 RSI < 30 时入场，目标收益5%，严格执行止损以防趋势反转。',
        arbitrage: '检测到多个交易所间存在持续的价格差异，套利机会频繁出现。该策略风险较低，但需要快速执行。建议使用小仓位高频交易，确保流动性充足。',
    };
    return analyses[strategyId] || analyses.trend_following;
}

export function useTradingSimulation() {
    const t = useTranslations('trading_simulation');
    const [status, setStatus] = useState<TradingStatus>('idle');
    const [strategies, setStrategies] = useState<Strategy[]>([]); // 改为数组存储多个策略
    const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number>(0); // 当前选中的策略索引
    const [startPrice, setStartPrice] = useState<number | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);

    // 获取当前选中的策略
    const strategy = strategies.length > 0 ? strategies[selectedStrategyIndex] : null;

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
        // Simulate AI processing time (5 seconds to allow all animation steps to complete)
        // 4 steps * 0.5s delay + 1.5s for checkmarks + 0.5s buffer = 4.5s
        await new Promise(resolve => setTimeout(resolve, 5000));

        // 生成 3 个不同的策略
        const generatedStrategies: Strategy[] = PRESET_STRATEGIES.map((preset, index) => {
            const baseReturn = preset.riskLevel === 'high' ? 15 : preset.riskLevel === 'medium' ? 10 : 6;

            return {
                id: preset.id,
                name: t(`strategies.${preset.id}.name`),
                description: t(`strategies.${preset.id}.description`),
                expectedReturn: t(`strategies.${preset.id}.expected_return`),
                riskLevel: preset.riskLevel,
                riskLabel: t(`risk.${preset.riskLevel}`),
                // 新增字段
                backtestData: generateBacktestData('30d', baseReturn),
                technicalIndicators: currentPrice ? generateTechnicalIndicators(currentPrice) : undefined,
                parameters: generateStrategyParameters(preset.id),
                genetics: generateStrategyGenetics(preset.id),
                aiConfidence: 85 + Math.random() * 10, // 85-95%
                marketAdaptability: 75 + Math.random() * 20, // 75-95%
                aiAnalysis: generateAIAnalysis(preset.id, t),
            };
        });

        setStrategies(generatedStrategies);
        setSelectedStrategyIndex(0); // 默认选中第一个
        setStatus('ready');
    }, [t, currentPrice]);

    // 选择策略
    const selectStrategy = useCallback((index: number) => {
        if (index >= 0 && index < strategies.length) {
            setSelectedStrategyIndex(index);
        }
    }, [strategies.length]);

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
        strategy, // 当前选中的策略
        strategies, // 所有生成的策略
        selectedStrategyIndex, // 当前选中的索引
        startPrice,
        currentPrice,
        position,
        startTime,
        generateStrategy,
        selectStrategy, // 新增：选择策略的方法
        startTrading,
        completeTrade,
    };
}
