import React from 'react';
import { Modal as AntdModal } from 'antd';
import cn from 'classnames';

const Modal = ({ styleType = '', ...props }) => {
  const classname = cn({
    [styleType]: true,
  });

  return <AntdModal {...props} className={classname} />;
};

export default Modal;
