"use client";

import { useState, useEffect } from "react";

export function Typewriter({
    text,
    typingSpeed = 200, // Slower default base speed
    className = ""
}: {
    text: string;
    typingSpeed?: number;
    className?: string;
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let index = 0;
        let timeoutId: NodeJS.Timeout;

        const typeNextChar = () => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;

                // Add a slight random variance (-30ms to +30ms) to make it feel natural and smooth
                const variance = Math.random() * 60 - 30;
                const nextSpeed = typingSpeed + variance;

                timeoutId = setTimeout(typeNextChar, nextSpeed);
            }
        };

        // Initial slight delay before starting to type
        timeoutId = setTimeout(typeNextChar, 300);

        return () => clearTimeout(timeoutId);
    }, [text, typingSpeed]);

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((v) => !v);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className={className}>
            {displayedText}
            <span
                className={`inline-block w-[3px] h-[0.9em] ml-1 bg-zinc-900 align-baseline transition-opacity duration-200 dark:bg-zinc-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
            />
        </span>
    );
}
