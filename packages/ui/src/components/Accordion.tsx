'use client';

import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { RightArrowIcon } from '../icons-generated';
import { cn } from '../lib/utils';

// --- Types & Context ---

type AccordionContextType = {
  activeItem: string | undefined;
  setActiveItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

const AccordionItemContext = React.createContext<string | undefined>(undefined);

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem',
    );
  }
  return context;
}

// --- Components ---

interface AccordionProps extends React.ComponentPropsWithRef<'div'> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Accordion({
  children,
  className,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: AccordionProps) {
  const [activeItem, setActiveItemState] = React.useState<string | undefined>(
    defaultValue,
  );

  const setActiveItem = React.useCallback(
    (value: string) => {
      const newValue = activeItem === value ? '' : value;
      setActiveItemState(newValue);
      if (onValueChange) onValueChange(newValue);
    },
    [activeItem, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.ComponentPropsWithRef<'div'> {
  value: string;
}

function AccordionItem({
  className,
  value,
  children,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div
        ref={ref}
        data-value={value}
        className={cn('border-b border-gray-200 bg-white', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps extends React.ComponentPropsWithRef<'button'> {
  hideIcon?: boolean;
  iconClassName?: string;
}

function AccordionTrigger({
  className,
  children,
  hideIcon = false,
  iconClassName,
  onClick,
  ref,
  ...props
}: AccordionTriggerProps) {
  const { activeItem, setActiveItem } = useAccordion();
  const itemValue = useAccordionItem();
  const isOpen = activeItem === itemValue;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveItem(itemValue);
    onClick?.(e);
  };

  return (
    <div className='flex w-full'>
      <button
        ref={ref}
        type='button'
        onClick={handleClick}
        className={cn(
          'flex-between text-base-l-16-2 flex-1 cursor-pointer border-b border-transparent bg-transparent py-5 text-left transition-all hover:bg-gray-50',
          { 'border-b-gray-200 bg-gray-50': isOpen },
          className,
        )}
        aria-expanded={isOpen}
        {...props}
      >
        {children}

        {!hideIcon && (
          <RightArrowIcon
            className={cn(
              'ml-4 size-6 shrink-0 rotate-90 text-gray-400 transition-transform duration-300',
              isOpen && '-rotate-90',
              iconClassName,
            )}
          />
        )}
      </button>
    </div>
  );
}

// --- AccordionContent ---

function AccordionContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const { activeItem } = useAccordion();
  const itemValue = useAccordionItem();
  const isOpen = activeItem === itemValue;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key='content'
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.2, ease: 'easeOut' },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
          }}
          className='overflow-hidden'
        >
          <div
            ref={ref}
            className={cn('text-base-l-16-1 px-4 pb-10 pt-5', className)}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
