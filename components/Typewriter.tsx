'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';

const MIN_LINE_DURATION_SECONDS = 0.45;
const MAX_LINE_DURATION_SECONDS = 1.6;
const PER_CHAR_SECONDS = 0.055;
const BASE_DELAY_SECONDS = 0.18;
const LINE_GAP_SECONDS = 0.2;
const LINE_TOP_THRESHOLD = 0.5;

function toSeconds(seconds: number) {
  return `${seconds.toFixed(2)}s`;
}

function getLineDurationSeconds(steps: number) {
  return Math.min(MAX_LINE_DURATION_SECONDS, Math.max(MIN_LINE_DURATION_SECONDS, steps * PER_CHAR_SECONDS));
}

function isSameLines(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((line, index) => line === b[index]);
}

function splitIntoRenderedLines(text: string, container: HTMLElement, measureElement: HTMLSpanElement) {
  const width = container.clientWidth;
  if (!width) return [text];

  measureElement.style.width = `${width}px`;
  measureElement.textContent = text;

  const node = measureElement.firstChild;
  if (!(node instanceof Text)) return [text];

  const chars = Array.from(text);
  if (chars.length <= 1) return [text];

  const offsets: number[] = [];
  let totalOffset = 0;
  for (const char of chars) {
    totalOffset += char.length;
    offsets.push(totalOffset);
  }

  const range = document.createRange();
  const lines: string[] = [];
  let currentLineStart = 0;
  let lastTop: number | null = null;

  for (let index = 0; index < chars.length; index += 1) {
    range.setStart(node, 0);
    range.setEnd(node, offsets[index]!);
    const rects = range.getClientRects();
    if (!rects.length) continue;
    const currentRect = rects.item(rects.length - 1);
    if (!currentRect) continue;

    if (lastTop === null) {
      lastTop = currentRect.top;
      continue;
    }

    if (Math.abs(currentRect.top - lastTop) > LINE_TOP_THRESHOLD) {
      lines.push(chars.slice(currentLineStart, index).join(''));
      currentLineStart = index;
      lastTop = currentRect.top;
    }
  }

  lines.push(chars.slice(currentLineStart).join(''));
  return lines.filter((line, index) => line.length > 0 || index === 0);
}

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState([text]);
  const [ready, setReady] = useState(false);

  const measureLines = useCallback(() => {
    if (!rootRef.current || !measureRef.current) {
      setLines((previous) => (isSameLines(previous, [text]) ? previous : [text]));
      setReady(true);
      return;
    }

    const nextLines = splitIntoRenderedLines(text, rootRef.current, measureRef.current);
    setLines((previous) => (isSameLines(previous, nextLines) ? previous : nextLines));
    setReady(true);
  }, [text]);

  useLayoutEffect(() => {
    setReady(false);
    measureLines();

    if (!rootRef.current) return;
    const observer = new ResizeObserver(() => {
      measureLines();
    });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [measureLines]);

  const lineStyles = useMemo(() => {
    let elapsed = BASE_DELAY_SECONDS;
    return lines.map((line) => {
      const steps = Math.max(Array.from(line).length, 1);
      const duration = getLineDurationSeconds(steps);
      const style = {
        '--tw-typewriter-steps': steps,
        '--tw-typewriter-duration': toSeconds(duration),
        '--tw-typewriter-delay': toSeconds(elapsed),
      } as CSSProperties;
      elapsed += duration + LINE_GAP_SECONDS;
      return style;
    });
  }, [lines]);

  return (
    <span ref={rootRef} className={cn('typewriter', className)}>
      <span ref={measureRef} className="typewriter__measure" aria-hidden="true" />
      <span className={cn('typewriter__content', !ready && 'typewriter__content--hidden')} role="text" aria-label={text}>
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="typewriter__line" style={lineStyles[index]}>
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}
