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
  '1': 'bg-[#0051A3] font-roboto-flex pt-[3px] pb-[2.5px]',
  '2': 'bg-[#00A74C] font-roboto-flex pt-[3px] pb-[2.5px]',
  '3': 'bg-[#EC6A00] font-roboto-flex pt-[3px] pb-[2.5px]',
  '4': 'bg-[#0797CB] font-roboto-flex pt-[3px] pb-[2.5px]',
  '5': 'bg-[#774898] font-roboto-flex pt-[3px] pb-[2.5px]',
  '6': 'bg-[#733819] font-roboto-flex pt-[3px] pb-[2.5px]',
  '7': 'bg-[#686E32] font-roboto-flex pt-[3px] pb-[2.5px]',
  '8': 'bg-[#D72171] font-roboto-flex pt-[3px] pb-[2.5px]',
  '9': 'bg-[#A49D89] font-roboto-flex pt-[3px] pb-[2.5px]',
  경의: 'bg-[#60C3AD]',
  수인: 'bg-[#E2A40E]',
  공항: 'bg-[#0090D2]',
  인천1: 'bg-[#86B0E1]',
};

const Badge = (props: BadgeProps) => {
  const baseStyles = 'flex-center rounded-1000';

  if (props.variant === 'subway') {
    const { line, className = '' } = props;

    const colorClass = subwayLineColors[line] || 'bg-gray-400';

    return (
      <p
        className={`${baseStyles} text-base-exs-10-2 px-1.5 py-[2.5px] text-white ${colorClass} ${className}`}
      >
        {line}
      </p>
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
