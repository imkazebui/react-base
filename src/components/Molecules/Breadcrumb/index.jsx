/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Breadcrumb as BreadcrumbAnt } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Breadcrumb = ({ className, breadcrumbs = [], breadcrumbExtension }) => {
  if (!breadcrumbs?.length && !breadcrumbExtension?.length) return null;
  if (breadcrumbExtension?.length) {
    breadcrumbs = [...breadcrumbs, ...breadcrumbExtension];
  }
  return (
    <BreadcrumbAnt className={cn('breadcrumb-wrapper', className)} separator=">">
      {breadcrumbs.map((item, idx) => {
        const isLastChild = idx + 1 === breadcrumbs.length;
        return (
          <BreadcrumbAnt.Item key={idx}>
            {item.link ? (
              <Link
                to={item.link}
                className={cn('my-breadcrumb-item', {
                  active: isLastChild || item.active,
                })}
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={cn('my-breadcrumb-item', {
                  active: isLastChild || item.active,
                })}
              >
                {item.name}
              </span>
            )}
          </BreadcrumbAnt.Item>
        );
      })}
    </BreadcrumbAnt>
  );
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  breadcrumbs: PropTypes.array,
  breadcrumbExtension: PropTypes.array,
};

export default Breadcrumb;
