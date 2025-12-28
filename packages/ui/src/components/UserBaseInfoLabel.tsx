import { cn } from '../lib/utils';
import Tag from './Tag';

interface Props {
  instrumentDescription: string;
  nickname: string;
  className?: string;
}

const UserBaseInfoLabel = ({
  instrumentDescription,
  nickname,
  className,
}: Props) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Tag variant='musician'>{instrumentDescription}</Tag>
      <span className='text-base-l-16-2 text-black'>{nickname}</span>
    </div>
  );
};

export default UserBaseInfoLabel;
