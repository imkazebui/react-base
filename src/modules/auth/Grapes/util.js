const defaultOptions = [
  {
    label: 'Volvo',
    value: 'volvo',
  },
  {
    label: 'Saab',
    value: 'saab',
  },
  {
    label: 'Mercedes',
    value: 'mercedes',
  },
  {
    label: 'Audi',
    value: 'audi',
  },
];

export const generateSelectUI = (
  id = '',
  options = defaultOptions,
  name = ''
) => {
  return (
    <select name={name} id={id} className="custom-select">
      {options.map(({ label, value }, idx) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
};

export const getElVal = (id, defaultValue = '') => {
  let el = document.getElementById(id);

  return el ? el.value : defaultValue;
};
