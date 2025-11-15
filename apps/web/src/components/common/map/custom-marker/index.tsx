type Props = {
  label: string;
  onClick: () => void;
};

export default function CustomMarkerLabel({ label, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className='rounded-4 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer whitespace-nowrap bg-purple-500 px-2 py-1 text-xs font-bold text-white shadow-md hover:bg-purple-900'
    >
      {label}
    </div>
  );
}
