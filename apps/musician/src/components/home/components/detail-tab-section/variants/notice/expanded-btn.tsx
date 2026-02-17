'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@muroom/components';

interface Props {
  message: string;
}

export default function ExpandableText({ message }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isClamped =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverflowing(isClamped);
    }
  }, [message]);

  return (
    <div className='relative flex flex-col gap-y-6'>
      <p
        ref={textRef}
        className={`whitespace-pre-wrap text-base ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}
      >
        {message}
      </p>

      {isOverflowing && !isExpanded && (
        <div className='flex-center'>
          <Button
            variant='outline'
            size='l'
            onClick={() => setIsExpanded(true)}
          >
            {'더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
