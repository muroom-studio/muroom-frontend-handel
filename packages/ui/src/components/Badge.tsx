interface BadgeBaseProps {
  className?: string;
}

interface SubwayBadgeProps extends BadgeBaseProps {
  variant: 'subway';
  lineName: string;
  lineColor: string;
}

interface AlertBadgeProps extends BadgeBaseProps {
  variant: 'alert';
  count: number;
}

type BadgeProps = SubwayBadgeProps | AlertBadgeProps;

const subwayLineColors: Record<string, string> = {
  '1': 'bg-[#0051A3] py-[1px] w-[18px]',
  '2': 'bg-[#00A74C] py-[1px] w-[18px]',
  '3': 'bg-[#EC6A00] py-[1px] w-[18px]',
  '4': 'bg-[#0797CB] py-[1px] w-[18px]',
  '5': 'bg-[#774898] py-[1px] w-[18px]',
  '6': 'bg-[#733819] py-[1px] w-[18px]',
  '7': 'bg-[#686E32] py-[1px] w-[18px]',
  '8': 'bg-[#D72171] py-[1px] w-[18px]',
  '9': 'bg-[#A49D89] py-[1px] w-[18px]',
  경의: 'bg-[#60C3AD] py-[2px]',
  수인: 'bg-[#E2A40E] py-[2px]',
  공항: 'bg-[#0090D2] py-[2px]',
  인천1: 'bg-[#86B0E1] py-[2px]',
};

const Badge = (props: BadgeProps) => {
  const baseStyles = 'flex-center shrink-0';

  if (props.variant === 'subway') {
    const { lineName, lineColor, className = '' } = props;

    const lineStyles = subwayLineColors[lineName];

    if (lineStyles) {
      return (
        <p
          className={`${baseStyles} rounded-1000 text-base-exs-10-2 h-[18px] px-1 text-white ${lineStyles} ${className}`}
        >
          {lineName}
        </p>
      );
    } else {
      // lineStyles가 없으면 lineColor (fallback)를 사용하여 style 객체로 배경색을 적용
      return (
        <p
          className={`${baseStyles} rounded-1000 text-base-exs-10-2 h-[18px] px-1 py-[2px] text-white ${className}`}
          style={{ backgroundColor: lineColor }}
        >
          {lineName}
        </p>
      );
    }
  }

  if (props.variant === 'alert') {
    const { count, className = '' } = props;
    const isZero = count === 0;

    const variantStyles = isZero
      ? 'bg-gray-300 text-white'
      : 'bg-primary-600 text-white';

    return (
      <span
        className={`${baseStyles} rounded-4 text-base-s-12-2 px-1.5 py-[2px] ${variantStyles} ${className}`}
      >
        {count}
      </span>
    );
  }

  return null;
};

export default Badge;
