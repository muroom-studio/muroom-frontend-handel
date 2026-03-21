'use client'

import { useSignUpStore, STEP_ORDER } from './_store/sign-up-store'
import { SignUpInfoForm, SignUpTermsForm, SignUpVerifyForm } from './_components'

export default function SignUpPage() {
  const completedSteps = useSignUpStore((s) => s.completedSteps)
  const currentStep = STEP_ORDER.find((step) => !completedSteps.includes(step)) ?? 'info'

  if (currentStep === 'terms') return <SignUpTermsForm />
  if (currentStep === 'verify') return <SignUpVerifyForm />
  return <SignUpInfoForm />
}
