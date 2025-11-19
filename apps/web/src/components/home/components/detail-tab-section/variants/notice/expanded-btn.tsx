'use state';

import { Button } from '@muroom/components';
import React, { useState, useMemo } from 'react';

const MAX_LINES = 3;

interface Props {
  message: string;
}

export default function ExpandableText({ message }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = useMemo(
    () => message.split('\n').filter((line) => line.trim() !== ''),
    [],
  );

  const initialText = lines.slice(0, MAX_LINES).join('\n');

  const isShortText = lines.length <= MAX_LINES;

  return (
    <div className='relative'>
      <p className='whitespace-pre-wrap text-base'>
        {isExpanded ? message : initialText}
      </p>

      {!isShortText && !isExpanded && (
        <div className='flex-center'>
          <Button
            variant='outline'
            size='l'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {'더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
