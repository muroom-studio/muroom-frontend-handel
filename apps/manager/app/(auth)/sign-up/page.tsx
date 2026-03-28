'use client'

import {
  SignUpInfoForm,
  SignUpTermsForm,
  SignUpVerifyForm,
} from './_components'
import { STEP_ORDER, useSignUpStore } from './_store/sign-up-store'

export default function SignUpPage() {
  const completedSteps = useSignUpStore((s) => s.completedSteps)
  const currentStep =
    STEP_ORDER.find((step) => !completedSteps.includes(step)) ?? 'info'

  if (currentStep === 'terms') return <SignUpTermsForm />
  if (currentStep === 'verify') return <SignUpVerifyForm />
  return <SignUpInfoForm />
}
