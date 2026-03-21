import { create } from 'zustand';

type SignUpStep = 'info' | 'terms' | 'verify';

interface SignUpState {
  completedSteps: SignUpStep[];
  email: string;
  password: string;
  completeStep: (
    step: SignUpStep,
    data?: Partial<Pick<SignUpState, 'email' | 'password'>>,
  ) => void;
  isStepAccessible: (step: SignUpStep) => boolean;
  reset: () => void;
}

export const STEP_ORDER: SignUpStep[] = ['info', 'terms', 'verify'];

const initialState = {
  completedSteps: [] as SignUpStep[],
  email: '',
  password: '',
};

export const useSignUpStore = create<SignUpState>((set, get) => ({
  ...initialState,

  completeStep: (step, data) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
      ...data,
    })),

  isStepAccessible: (step) => {
    if (step === 'info') return true;
    const prevStep = STEP_ORDER[STEP_ORDER.indexOf(step) - 1];
    return prevStep !== undefined && get().completedSteps.includes(prevStep);
  },

  reset: () => set(initialState),
}));
