import React from 'react';
import { Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';

const { confirm, error } = Modal;

export const showModalConfirm = ({
  title,
  content,
  icon,
  okText,
  okType,
  cancelText,
  onOk,
  onCancel,
}) => {
  confirm({
    title: title || '',
    icon: icon || <ExclamationCircleOutlined />,
    content: content || '',
    okText: okText || 'Yes',
    okType: okType || 'danger',
    cancelText: cancelText || 'No',
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};

export const showModalError = ({
  title,
  content,
  icon,
  okText,
  okType,
  onOk,
  onCancel,
  centered = true,
}) => {
  error({
    title: title || '',
    icon: icon || <CloseCircleFilled style={{ color: '#FF5A5B' }} />,
    content: content || '',
    okText: okText || 'OK',
    okType: okType || 'primary',
    okButtonProps: {
      style: {
        width: '82px',
        height: '32px',
        borderRadius: '4px',
        borderColor: '#FFA39E',
        backgroundColor: '#FFF1F0',
        color: '#FF4D4F',
      },
    },
    centered,
    onOk(close) {
      onOk && onOk();
      close();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};
