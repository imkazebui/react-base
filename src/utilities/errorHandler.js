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

  /**
   * TODO: have a new way to get onOk func
   */
  static showError(err, options = {}) {
    const initOptions = { onOk: () => {} };
    const newOptions = { ...initOptions, ...options };
    const { onOk } = newOptions;
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
