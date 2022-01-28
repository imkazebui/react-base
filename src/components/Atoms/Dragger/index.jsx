import React from 'react';
import cn from 'classnames';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';

const { Dragger: DraggerAntd } = Upload;

const Dragger = ({ children, className, ...rest }) => (
  <DraggerAntd className={cn('dragger-wrapper', className)} {...rest}>
    {children}
  </DraggerAntd>
);

Dragger.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

Dragger.defaultProps = {
  className: '',
  children: <div>Dragger</div>,
};

export default Dragger;
