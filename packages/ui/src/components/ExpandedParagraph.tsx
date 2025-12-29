'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '../lib/utils';

interface TruncatedTextProps {
  children: string;
  lines?: number;
  className?: string;
}

const ExpandedParagraph = ({
  children,
  lines = 3,
  className,
}: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isClamped =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverflowing(isClamped);
    }
  }, [children, lines]);

  const handleExpand = () => {
    if (isExpanded || !isOverflowing) return;
    setIsExpanded(true);
  };

  return (
    <p
      ref={textRef}
      onClick={handleExpand}
      className={cn(
        'text-base-l-16-1 whitespace-pre-wrap break-all',
        {
          'line-clamp-2': !isExpanded && lines === 2,
          'line-clamp-3': !isExpanded && lines === 3,
          'cursor-pointer': !isExpanded && isOverflowing,
        },
        className,
      )}
    >
      {children}
    </p>
  );
};

export default ExpandedParagraph;
