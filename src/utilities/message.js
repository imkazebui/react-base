import { message } from 'antd';

const duration = 3;

export const messageSuccess = (config) => {
  message.success({ duration, ...config });
};

export const messageError = (config) => {
  message.error({ duration, ...config });
};

export const messageDestroy = () => {
  message.destroy();
};

export const messageLoading = (config) => {
  return message.loading({ duration, ...config });
};
