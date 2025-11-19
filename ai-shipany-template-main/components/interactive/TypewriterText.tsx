"use client";

import { TypeAnimation } from 'react-type-animation';

interface TypewriterTextProps {
    text: string | string[];
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export default function TypewriterText({ 
    text, 
    speed = 50, 
    className = "",
    onComplete 
}: TypewriterTextProps) {
    // 如果是字符串数组，转换为 TypeAnimation 需要的格式
    const sequence = Array.isArray(text) 
        ? text.flatMap(t => [t, 1000]) // 每段文字后停顿 1 秒
        : [text];

    return (
        <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={speed as any}
            className={className}
            cursor={true}
            repeat={0}
            style={{ display: 'inline-block' }}
            omitDeletionAnimation={true}
        />
    );
}

