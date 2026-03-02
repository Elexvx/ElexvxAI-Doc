import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

const MIN_DURATION_SECONDS = 1.2;
const MAX_DURATION_SECONDS = 3.2;
const PER_CHAR_SECONDS = 0.09;

function getDuration(steps: number) {
  const duration = Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, steps * PER_CHAR_SECONDS));
  return `${duration.toFixed(2)}s`;
}

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const steps = Math.max(Array.from(text).length, 1);
  const style = {
    '--tw-typewriter-steps': steps,
    '--tw-typewriter-duration': getDuration(steps),
  } as CSSProperties;

  return (
    <span className={cn('typewriter', className)} style={style}>
      <span className="typewriter__text">{text}</span>
    </span>
  );
}
