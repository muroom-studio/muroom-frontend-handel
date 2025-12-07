import { Variant } from '@/components/home/components/filter-item';
import { FilterOptionItem } from '@/types/studios';

interface GetLabelParams {
  variant: Variant;
  filters: any;
  data: any;
}

// 사이즈 포맷팅 헬퍼 함수
const formatSize = (min: number | null, max: number | null) => {
  if (min === null && max === null) return '';
  if (min === 0 && max !== null) return `~${max}`;
  if (min !== null && max === null) return `${min}~`;
  return `${min}~${max}`;
};

const formatList = (
  list: string[] | null | undefined,
  defaultLabel: string,
  options?: FilterOptionItem[],
) => {
  if (!list || list.length === 0) return defaultLabel;

  const labels = list.map((code) => {
    const found = options?.find((opt) => opt.code === code);
    return found ? found.description : code;
  });

  return labels.join(', ');
};

export const getFilterLabel = ({ variant, filters, data }: GetLabelParams) => {
  const VARIANT_DEFAULT_LABELS: Record<Variant, string> = {
    e1: '가격',
    e2: '사이즈',
    e3: '옵션',
    e4: '건물 유형',
    e5: '악기',
  };

  switch (variant) {
    case 'e1': // 가격
      if (filters.minPrice !== null && filters.maxPrice !== null) {
        const min =
          filters.minPrice >= 10000
            ? filters.minPrice / 10000
            : filters.minPrice;
        const max =
          filters.maxPrice >= 10000
            ? filters.maxPrice / 10000
            : filters.maxPrice;
        return `${min}~${max}만원`;
      }
      return VARIANT_DEFAULT_LABELS.e1;

    case 'e2': // 사이즈 (가로/세로)
      const widthLabel = formatSize(filters.minRoomWidth, filters.maxRoomWidth);
      const heightLabel = formatSize(
        filters.minRoomHeight,
        filters.maxRoomHeight,
      );

      // 둘 다 선택 안 함 -> 기본 라벨
      if (!widthLabel && !heightLabel) return VARIANT_DEFAULT_LABELS.e2;

      // 하나만 선택함 -> 있는 것만 표시
      if (widthLabel && !heightLabel) return `가로 ${widthLabel}`;
      if (!widthLabel && heightLabel) return `세로 ${heightLabel}`;

      // 둘 다 선택함 -> "가로 ~ 세로 ~"
      return `가로 ${widthLabel} 세로 ${heightLabel}`;

    case 'e3': // 옵션
      const allOptions = [
        ...(filters.commonOptionCodes || []),
        ...(filters.individualOptionCodes || []),
      ];
      const optionMapData = [
        ...(data?.studioCommonOptions || []),
        ...(data?.studioIndividualOptions || []),
      ];
      return formatList(allOptions, VARIANT_DEFAULT_LABELS.e3, optionMapData);

    case 'e4': // 건물 유형
      const buildingLabels = [
        ...(filters.floorTypes || []),
        ...(filters.restroomTypes || []),
        filters.isParkingAvailable === true ? '주차가능' : null,
        filters.isParkingAvailable === false ? '주차불가' : null,
        filters.isLodgingAvailable === true ? '숙식가능' : null,
        filters.isLodgingAvailable === false ? '숙식불가' : null,
        filters.hasFireInsurance === true ? '화재보험가입' : null,
      ].filter(Boolean) as string[];

      const buildingMapData = [
        ...(data?.floorOptions || []),
        ...(data?.restroomOptions || []),
      ];

      const mappedBuildingLabels = buildingLabels.map((label) => {
        const found = buildingMapData.find((opt) => opt.code === label);
        return found ? found.description : label;
      });

      if (mappedBuildingLabels.length > 0) {
        return mappedBuildingLabels.join(', ');
      }
      return VARIANT_DEFAULT_LABELS.e4;

    case 'e5': // 악기
      return formatList(
        filters.forbiddenInstrumentCodes,
        VARIANT_DEFAULT_LABELS.e5,
        data?.forbiddenInstrumentOptions,
      );

    default:
      return VARIANT_DEFAULT_LABELS[variant];
  }
};
