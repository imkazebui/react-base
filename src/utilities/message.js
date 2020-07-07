import { message } from 'antd';

const duration = 10;

export const messageSuccess = (config) => {
  message.success({ ...config, duration });
};

export const messageError = (config) => {
  message.error({ ...config, duration });
};

export const messageDestroy = () => {
  message.destroy();
};

export const messageLoading = (config) => {
  return message.loading({ ...config, duration });
};
