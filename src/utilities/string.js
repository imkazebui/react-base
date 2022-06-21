export const hideString = (string) => {
  if (!string) {
    return '';
  }
  return `${string.substring(0, 3)}•••••${string.slice(string.length - 4)}`;
};

export const capitalizeFirstLetter = (string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

export const joinArr = (separator) => (arr) => arr.filter((_) => _).join(separator);

export const getFullName = joinArr(' ');

export const objectToQueryString = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
