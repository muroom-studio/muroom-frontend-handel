export const NICKNAME_RULES = {
  required: {
    value: true,
    message: '닉네임을 입력해주세요.',
  },
  maxLength: {
    value: 20,
    message: '닉네임은 최대 20자까지 가능합니다.',
  },
  pattern: {
    value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$/,
    message: '닉네임은 한글/영어/숫자만 사용가능합니다.',
  },
};

export const validateNickname = (value: string): string => {
  if (value && !NICKNAME_RULES.pattern.value.test(value)) {
    return NICKNAME_RULES.pattern.message;
  }

  if (value.length > NICKNAME_RULES.maxLength.value) {
    return NICKNAME_RULES.maxLength.message;
  }

  return '';
};
