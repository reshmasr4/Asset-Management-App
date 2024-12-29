export const validatePrice = (value: string | number): string | null => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return 'Price must be a number.';
    if (numberValue < 0) return 'Price must be a positive number.';
    return null;
  };
  