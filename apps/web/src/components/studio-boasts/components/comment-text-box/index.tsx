'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Button, Spinner, TextBox, TextField } from '@muroom/components';
import { LockOffIcon, LockOnIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface CommentTextBoxProps {
  content: string;
  onContentChange: (value: string) => void;
  isSecret: boolean;
  onSecretChange: (value: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
  placeholder?: string;
  submitLabel?: string;
  onCancel?: () => void;
  isMobile?: boolean;
  forceExpand?: boolean;
}

export default function CommentTextBox({
  content,
  onContentChange,
  isSecret,
  onSecretChange,
  onSubmit,
  isPending,
  placeholder = '공감이 된다면 같이 이야기 해볼까요?',
  submitLabel = '댓글달기',
  onCancel,
  isMobile = false,
  forceExpand = false,
}: CommentTextBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (forceExpand) {
      setIsFocused(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [forceExpand]);

  const showBottom = isFocused || content.length > 0 || forceExpand;

  if (isMobile) {
    return (
      <motion.div
        className='flex flex-col border-t border-t-gray-300 px-5 pt-5'
        initial={false}
        animate={{
          paddingBottom: showBottom ? 8 : 44,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <TextField
          ref={inputRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (content.length === 0 && !forceExpand) setIsFocused(false);
          }}
          onClear={() => {
            onContentChange('');
            onSecretChange(false);
            if (onCancel) onCancel();
            inputRef.current?.blur();
          }}
          className='w-full'
        />

        <AnimatePresence>
          {showBottom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='overflow-hidden'
            >
              <div className='flex-between pt-2'>
                <button
                  type='button'
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSecretChange(!isSecret)}
                  className={cn(
                    'flex-center group cursor-pointer gap-x-1 transition-all',
                    isSecret ? 'text-gray-800' : 'text-gray-500',
                  )}
                >
                  {isSecret ? (
                    <>
                      <LockOnIcon className='size-6 group-hover:opacity-80' />
                      <span className='text-base-s-12-2 group-hover:opacity-80'>
                        비밀댓글
                      </span>
                    </>
                  ) : (
                    <>
                      <LockOffIcon className='size-6 group-hover:opacity-80' />
                      <span className='text-base-s-12-2 group-hover:opacity-80'>
                        비밀댓글
                      </span>
                    </>
                  )}
                </button>

                <Button
                  variant='primary'
                  disabled={!content.trim() || isPending}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onSubmit}
                >
                  {isPending ? <Spinner variant='component' /> : submitLabel}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // 데스크톱 렌더링 (기존 유지)
  return (
    <TextBox
      id='COMMENT_CONTENT'
      placeholder={placeholder}
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      containerClassName='h-40'
      textareaClassName='min-h-0'
      bottomContent={
        <div className='flex-between'>
          <button
            type='button'
            onClick={() => onSecretChange(!isSecret)}
            className={cn(
              'flex-center group cursor-pointer gap-x-1 transition-all',
              isSecret ? 'text-gray-800' : 'text-gray-500',
            )}
          >
            {isSecret ? (
              <>
                <LockOnIcon className='size-6 group-hover:opacity-80' />
                <span className='text-base-s-12-2 group-hover:opacity-80'>
                  비밀댓글
                </span>
              </>
            ) : (
              <>
                <LockOffIcon className='size-6 group-hover:opacity-80' />
                <span className='text-base-s-12-2 group-hover:opacity-80'>
                  비밀댓글
                </span>
              </>
            )}
          </button>

          <div className='flex-center gap-x-3'>
            <Button
              variant='outline'
              onClick={() => {
                if (onCancel) {
                  onCancel();
                } else {
                  onContentChange('');
                  onSecretChange(false);
                }
              }}
            >
              취소
            </Button>
            <Button
              variant='primary'
              disabled={!content.trim() || isPending}
              onClick={onSubmit}
            >
              {isPending ? <Spinner variant='component' /> : submitLabel}
            </Button>
          </div>
        </div>
      }
    />
  );
}
