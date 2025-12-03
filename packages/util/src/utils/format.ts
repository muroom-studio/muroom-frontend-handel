export const formatPhoneNumber = (value: string | undefined | null) => {
  if (!value) return '';

  const cleanInput = value.replace(/[^0-9]/g, '');

  if (cleanInput.length === 11) {
    return cleanInput.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 10) {
    if (cleanInput.startsWith('02')) {
      return cleanInput.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return cleanInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 9) {
    return cleanInput.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 8) {
    return cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  return cleanInput;
};
