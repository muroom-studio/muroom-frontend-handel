export type TermType =
  | 'TERMS_OF_USE'
  | 'PRIVACY_COLLECTION'
  | 'PRIVACY_PROCESSING'
  | 'MARKETING_RECEIVE';

export interface Term {
  termId: number;
  type: TermType;
  targetRole: string;
  version: string;
  isMandatory: boolean;
  effectiveAt: string;
  content: string;
}
