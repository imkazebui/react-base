import React from 'react';
import cn from 'classnames';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Icon, { SirenErrorIcon } from 'components/Atoms/Icon';
import { isMobile } from './browser';

const { confirm, error } = Modal;

export const showModalError = ({
  title,
  content,
  icon,
  okText,
  okType,
  // onOk = (f) => f,
  // onCancel = (f) => f,
  centered = true,
}) => {
  error({
    title: (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <div>
          <Icon component={icon || SirenErrorIcon} />
        </div>
        <div className="text-lg mt-15">{title || 'Error!'}</div>
      </div>
    ),
    icon: null,
    content: <div className="mt-20">{content || ''}</div>,
    okText: okText || 'OK',
    okType: okType || 'primary',
    className: cn('my-error-modal'),
    okButtonProps: {
      className: 'site-button btn-primary-custom h-45',
      style: {
        width: '120px',
      },
    },
    centered,
    // onOk(close) {
    //   onOk();
    //   close();
    // },
    // onCancel() {
    //   onCancel && onCancel();
    // },
  });
};

export const showModalConfirm = ({
  title = '',
  content = '',
  icon,
  okText = 'Yes',
  okType = 'primary',
  cancelText,
  onOk = () => Promise.resolve(),
  onCancel = () => Promise.resolve(),
  loading,
  centered = false,
  ...rest
}) => {
  confirm({
    title,
    icon: icon || <ExclamationCircleOutlined />,
    content,
    okText,
    okType,
    cancelText: cancelText || 'No',
    onOk,
    onCancel,
    centered,
    closable: true,
    ...rest,
  });
};

export const showModalConfirmStylePrimary = (props) => {
  showModalConfirm({
    ...props,
    icon: null,
    className: cn('my-modal-confirm-primary-style', props.className),
    okButtonProps: props.okButtonProps || {
      className: `site-button btn-primary-custom ${isMobile ? 'h-40' : 'h-45'}`,
      style: {
        width: isMobile ? '100px' : '175px',
      },
    },
    cancelButtonProps: props.cancelButtonProps || {
      className: `site-button btn-secondary-outline ${isMobile ? 'h-40' : 'h-45'}`,
      style: {
        width: isMobile ? '100px' : '175px',
      },
    },
    centered: typeof props.centered !== 'undefined' ? props.centered : true,
  });
};
