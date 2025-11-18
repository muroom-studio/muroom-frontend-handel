import SectionWrapper from '../../components/section-wrapper';
import GridRowItem from '../../components/grid-row-item';

import ExpandableText from './expanded-btn';

import { Tag } from '@muroom/components';

interface Props {
  title: string;
}

export default function NoticeSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <div className='flex items-center gap-x-2'>
          <Tag variant='owner'>사장님</Tag>
          <span className='text-base-m-14-1 text-black'>김강토</span>
        </div>
        <GridRowItem title='운영' sub1={'14년'} />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='본인인증'
          sub1={<Tag variant='blue'>3개 남음</Tag>}
        />
        <div className='h-px bg-gray-200' />
        <ExpandableText message={dummyText} />
      </>
    </SectionWrapper>
  );
}

const dummyText = `안녕하세요. 0.2스튜디오입니다.\n
저희는 방음과 환경, 건강까지 꼼꼼히 신경 써서 공간을 준비했습니다.\n
완벽한 방음 🤫\n
옆방이나 복도 소음 때문에 스트레스 받지 않으시도록 벽 두께를 무려 50cm로 시공했습니다.\n
그린글루, 디커플링 등 최고 사양 방음 자재를 사용하여 안심하시고 연습과 휴식을 즐기실 수 있습니다.\n
쾌적한 환경 🌱\n
답답하지 않도록 복도를 1.6m로 넓게 설계했습니다. 또한 건물 전체 방 개수를 최소화하여 북적임 없이 조용하고 쾌적한 사용이 가능합니다.\n
안전한 자재 & 편안한 조명 ✨\n
눈에 보이지 않는 부분까지 신경 써서 모든 자재는 친환경·방염 자재만 사용했습니다.\n
조명은 플리커프리 고급 제품을 설치하여 눈 피로 없이 편안하게 이용하실 수 있습니다.\n
언제든 편하게 문의 주세요. 감사합니다.
📞`;
