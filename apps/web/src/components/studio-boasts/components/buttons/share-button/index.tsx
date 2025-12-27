import { ShareIcon } from '@muroom/icons';

import { handleCopyClipboard } from '@/utils/handleCopyClipboard';

import StudioBoastsButtonWrapper from '../button-wrapper';

export default function StudioBoastsShareButton() {
  return (
    <StudioBoastsButtonWrapper onClick={handleCopyClipboard}>
      <ShareIcon className='size-6' />
    </StudioBoastsButtonWrapper>
  );
}
