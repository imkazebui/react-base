export const isLocalHost =
  typeof window !== 'undefined' && window.location.origin.indexOf('localhost') > -1;

export const getUrlVars = () => {
  const vars = {};
  decodeURIComponent(window.location.href.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')).replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (m, key, value) => {
      vars[key] = value;
    }
  );
  return vars;
};

export const getParamFromUrlSearch = (parameter, defaultvalue = '') => {
  let urlparameter = defaultvalue;
  if (typeof window !== 'undefined' && window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
};
