export const convertCentToDollar = (value) => {
  if (!value) return;
  return parseInt(value) * 0.01;
};

export const separateCurrency = (number = 0, characterSeparator = ',') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, characterSeparator);
};

export const formatNumber = (
  number,
  option = {
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  },
  isCurrency = true
) => {
  if (isNaN(number)) return '';
  if (isCurrency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      ...option,
    }).format(number);
  } else {
    return new Intl.NumberFormat('en-US').format(number);
  }
};
