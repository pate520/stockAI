"use client";

// 简化版神经网络动画 - 使用 CSS 动画代替 Three.js 以避免类型错误
export default function NeuralNetworkAnimation() {
    return (
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-cyan-500/5 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>
    );
}

/* 原 Three.js 实现已移除以避免类型错误 */