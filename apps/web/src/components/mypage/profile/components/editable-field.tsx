interface Props {
  name: string;
  isEditable?: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function EditableField({
  name,
  isEditable,
  onEdit,
  children,
}: Props) {
  return (
    <div className='flex w-full flex-col gap-y-6 border-b border-b-gray-400 px-5 py-6 first:pt-0'>
      <div className='flex-between'>
        <span className='text-base-exl-18-2'>{name}</span>
        {isEditable && (
          <span
            onClick={onEdit}
            className='text-base-m-14-2 cursor-pointer text-gray-400'
          >
            편집
          </span>
        )}
      </div>
      <div className='text-base-l-16-1'>{children}</div>
    </div>
  );
}
