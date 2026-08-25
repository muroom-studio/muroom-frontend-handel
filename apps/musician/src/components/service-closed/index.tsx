const CONTACT_PHONE = '070-8098-6060';

export default function ServiceClosedNotice() {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-white px-6 py-12 text-neutral-900'>
      <section className='w-full max-w-xl space-y-8'>
        <header className='space-y-3'>
          <p className='text-sm font-semibold tracking-wide text-neutral-500'>
            뮤룸 (Muroom)
          </p>
          <h1 className='text-3xl font-bold leading-tight'>서비스 종료 안내</h1>
        </header>

        <div className='space-y-4 text-base leading-relaxed text-neutral-700'>
          <p>
            그동안 뮤룸을 이용해 주신 모든 분들께 진심으로 감사드립니다.
            <br />
            아쉽게도 뮤룸 서비스는 <strong>종료</strong>되었으며, 더 이상
            서비스를 이용하실 수 없습니다.
          </p>

          <div className='rounded-xl border border-neutral-200 bg-neutral-50 p-5'>
            <h2 className='mb-2 text-sm font-semibold text-neutral-900'>
              개인정보 및 데이터 파기 안내
            </h2>
            <p className='text-sm'>
              회원님의 개인정보를 포함한 모든 데이터는{' '}
              <strong>2026년 8월 31일</strong>에 즉시 파기될 예정입니다. 파기
              이후에는 어떠한 데이터도 복구되지 않습니다.
            </p>
          </div>

          <div className='rounded-xl border border-neutral-200 bg-neutral-50 p-5'>
            <h2 className='mb-2 text-sm font-semibold text-neutral-900'>
              긴급사항 및 문의
            </h2>
            <p className='text-sm'>
              긴급사항이나 문의사항이 있으신 경우 아래 번호로 연락해 주세요.
            </p>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className='mt-2 inline-block text-lg font-bold text-neutral-900 underline underline-offset-4'
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <footer className='text-sm text-neutral-500'>
          다시 한번 그동안 보내주신 관심과 사랑에 감사드립니다.
        </footer>
      </section>
    </main>
  );
}
