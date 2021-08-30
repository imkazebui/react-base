import { showModalError } from './modal';
// import Lang from './lang';

class ErrorHandler {
  static getErrorData(err) {
    return err;
  }

  static isEqualToCode(err, code) {
    const errData = this.getErrorData(err);
    return errData && errData.code === code;
  }

  static showError(err, options = {}) {
    const initOptions = { onOk: () => {} };
    options = { ...initOptions, ...options };
    const { onOk } = options;
    const errData = this.getErrorData(err);
    if (errData && errData.message) {
      showModalError({
        // title: 'ERROR',
        content: errData?.message || 'Unexpected error',
        onOk,
      });
    }
  }
}

export default ErrorHandler;
