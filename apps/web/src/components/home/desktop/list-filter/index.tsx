import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@muroom/components';

const SORT_OPTIONS = [
  '선택',
  '추천순',
  '최신순',
  '리뷰많은순',
  '평점높은순',
  '높은가격순',
  '낮은가격순',
];

export default function ListFilter() {
  return (
    <div className='flex-between shrink-0 border-b border-b-gray-300 p-4'>
      <span className='text-base-exl-18-2 text-black'>75개</span>
      <Dropdown placeholder='선택' className='w-24'>
        <DropdownTrigger variant='text' />
        <DropdownContent>
          {SORT_OPTIONS.map((option) => (
            <DropdownItem key={option} value={option}>
              {option}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
