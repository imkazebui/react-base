export const checkFormAntInvalid = (form, requiredField = []) => {
  let isEmptyObjects = false;
  const errors = form
    .getFieldsError()
    .filter(({ errors }) => errors.length).length;
  if (requiredField.length) {
    const dataFields = form.getFieldsValue() || {};
    isEmptyObjects = !checkRequiredFieldHasValue(dataFields, requiredField);
  }
  return errors || isEmptyObjects;
};

/*
 @param { 1: '', 2: {3: ''} } object
 @param ['1', '3'] requiredField: array of keys in object
 @return false . Check all requiredField have value
*/
const checkRequiredFieldHasValue = (object, requiredField) => {
  if (!object || object === null) return false;
  return (
    Object.entries(object).every(([key, data]) => {
      if (data && typeof data === 'object') {
        return checkRequiredFieldHasValue(data, requiredField);
      }
      if (requiredField?.indexOf(key) !== -1) {
        return !!data;
      }
      return true;
    }) || false
  );
};

export const resetFormErrors = (form) => {
  form.setFields(
    Object.entries(form.getFieldsValue()).reduce((acc, [key, value]) => {
      acc.push({
        name: key,
        value,
        errors: [],
      });
      return acc;
    }, [])
  );
};

export const resetErrorsAndValidateForm = (form) => {
  let validated = form.getFieldsError().some((el) => el.errors.length);
  resetFormErrors(form);
  if (validated) {
    form.validateFields();
  }
};
