export interface JoinCommonProps {
  step: number;
  progress: number;
  isNextValid: boolean;
  stepConfig: {
    label: string;
    onClick: () => void;
  };
  stepContent: React.ReactNode;
  onBackClick: () => void;
}
