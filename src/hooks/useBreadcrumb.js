import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import privateRoutes from 'routers/private';
import Breadcrumb from 'components/Atoms/Breadcrumb';
import useActions from './useActions';
import {
  FILTER_KEY,
  selectFiltersByKey,
  setFiltersFieldByKey,
} from './withFilter';
import { useSelector } from 'react-redux';
import { debounced } from 'utilities/common';

const privateRoutes = [];

const useBreadcrumb = () => {
  const location = useLocation();

  const filters = useSelector(selectFiltersByKey(FILTER_KEY.BREADCRUMB)) || {};
  const { idParam, breadcrumbExtension } = filters;
  const setFiltersFieldByKeyAction = useActions(setFiltersFieldByKey);
  const breadcrumbs = useMemo(() => {
    let { pathname } = location;
    if (idParam) {
      pathname = pathname.replace(idParam, ':id');
    }
    const route = privateRoutes.find((r) => r.path === pathname);
    if (route?.breadcrumbs?.length || breadcrumbExtension?.length) {
      return (
        <Breadcrumb
          breadcrumbs={route?.breadcrumbs || []}
          breadcrumbExtension={breadcrumbExtension}
        />
      );
    }
    return null;
  }, [location.pathname, idParam, breadcrumbExtension]);

  useEffect(() => {
    setFiltersFieldByKeyAction(FILTER_KEY.BREADCRUMB, {
      idParam: undefined,
      breadcrumbExtension: [],
    });
  }, [location.pathname]);

  const _setBreadcrumbFilter = useCallback((filter) => {
    debounced(() => setFiltersFieldByKeyAction(FILTER_KEY.BREADCRUMB, filter));
  }, []);

  return { breadcrumbs, setBreadcrumbFilter: _setBreadcrumbFilter };
};

export default useBreadcrumb;
