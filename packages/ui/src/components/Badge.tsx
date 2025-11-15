interface BadgeBaseProps {
  className?: string;
}

interface SubwayBadgeProps extends BadgeBaseProps {
  variant: 'subway';
  line: string;
}

interface AlertBadgeProps extends BadgeBaseProps {
  variant: 'alert';
  count: number;
}

type BadgeProps = SubwayBadgeProps | AlertBadgeProps;

const subwayLineColors: Record<string, string> = {
  '1': 'bg-[#0051A3] font-roboto-flex',
  '2': 'bg-[#00A74C] font-roboto-flex',
  '3': 'bg-[#EC6A00] font-roboto-flex',
  '4': 'bg-[#0797CB] font-roboto-flex',
  '5': 'bg-[#774898] font-roboto-flex',
  '6': 'bg-[#733819] font-roboto-flex',
  '7': 'bg-[#686E32] font-roboto-flex',
  '8': 'bg-[#D72171] font-roboto-flex',
  '9': 'bg-[#A49D89] font-roboto-flex',
  경의: 'bg-[#60C3AD]',
  수인: 'bg-[#E2A40E]',
  공항: 'bg-[#0090D2]',
  인천1: 'bg-[#86B0E1]',
};

const Badge = (props: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center';

  if (props.variant === 'subway') {
    const { line, className = '' } = props;

    const colorClass = subwayLineColors[line] || 'bg-gray-400';

    return (
      <span
        className={`${baseStyles} rounded-100 text-base-exs-10-2 h-[14px] text-white ${colorClass} ${className}`}
      >
        {line}
      </span>
    );
  }

  if (props.variant === 'alert') {
    const { count, className = '' } = props;
    const isZero = count === 0;

    const variantStyles = isZero
      ? 'bg-gray-300 text-white'
      : 'bg-primary-600 text-white';

    return (
      <span
        className={`${baseStyles} rounded-4 text-base-s-12-2 h-4 px-1 ${variantStyles} ${className}`}
      >
        {count}
      </span>
    );
  }

  return null;
};

export default Badge;
