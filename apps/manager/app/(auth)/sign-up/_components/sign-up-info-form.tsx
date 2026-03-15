'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, TextField } from '@muroom/ui/components';
import { LockOffIcon, LockOnIcon } from '@muroom/ui/icons';

import { AuthFormContainer } from '../../_components';
import { useSignUpStore } from '../_store/sign-up-store';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const schema = z
  .object({
    email: z.email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, '올바른 형식의 비밀번호를 입력해주세요'),
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (!PASSWORD_REGEX.test(password)) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호는 8자리 이상, 영문, 숫자, 특수문자 포함해주세요',
        path: ['passwordConfirm'],
      });
    } else if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: '입력한 비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export default function SignUpInfoForm() {
  const router = useRouter();
  const email = useSignUpStore((s) => s.email);
  const password = useSignUpStore((s) => s.password);
  const completeStep = useSignUpStore((s) => s.completeStep);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email, password, passwordConfirm: password },
  });

  const onSubmit = (data: FormValues) => {
    completeStep('info', { email: data.email, password: data.password });
    router.push('/sign-up/terms');
  };

  return (
    <AuthFormContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-10 p-10'
      >
        {/* 제목 */}
        <h1 className='text-[26px] font-semibold'>내 정보 입력</h1>

        {/* 폼 */}
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <TextField
              label='이메일'
              required
              type='email'
              placeholder='이메일을 입력해주세요'
              defaultValue={email}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <TextField
              label='비밀번호'
              placeholder='8자리 이상, 영문, 숫자, 특수문자 포함'
              type={showPassword ? 'text' : 'password'}
              defaultValue={password}
              hideClearButton
              rightIcon={
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                  }
                  className='flex items-center justify-center'
                >
                  {showPassword ? (
                    <LockOnIcon className='size-6' />
                  ) : (
                    <LockOffIcon className='size-6' />
                  )}
                </button>
              }
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}

            <TextField
              placeholder='비밀번호 확인'
              type={showPasswordConfirm ? 'text' : 'password'}
              defaultValue={password}
              hideClearButton
              rightIcon={
                <button
                  type='button'
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  aria-label={
                    showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'
                  }
                  className='flex items-center justify-center'
                >
                  {showPasswordConfirm ? (
                    <LockOnIcon className='size-6' />
                  ) : (
                    <LockOffIcon className='size-6' />
                  )}
                </button>
              }
              {...register('passwordConfirm')}
            />
            {errors.passwordConfirm && (
              <p className='text-sm text-red-500'>
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        {/* 다음 버튼 */}
        <Button className='w-full' size='xl' type='submit' disabled={!isValid}>
          다음
        </Button>
      </form>
    </AuthFormContainer>
  );
}
