import React, { useCallback, useEffect } from 'react';
import { fromJS } from 'immutable';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useActions from 'hooks/useActions';

const withFilter =
  ({ filterKey, setDefault = true }) =>
  (WrappedComponent) => {
    const WithFilter = (props) => {
      const filters = useSelector(selectFiltersByKey(filterKey));
      const setFiltersFieldByKeyAction = useActions(setFiltersFieldByKey);

      useEffect(() => {
        if (setDefault && !filters) {
          setFiltersFieldByKeyAction(
            filterKey,
            Array.isArray(DEFAULT_FILTER[filterKey])
              ? [...DEFAULT_FILTER[filterKey]]
              : { ...DEFAULT_FILTER[filterKey] }
          );
        }
      }, []);

      const setFiltersFieldAction = useCallback((values) => {
        setFiltersFieldByKeyAction(filterKey, values);
      }, []);

      const _onChangePagination = useCallback(
        (data) => {
          const { current, ...rest } = data;
          setFiltersFieldAction({
            ...filters,
            page: current,
            ...rest,
          });
        },
        [filters, setFiltersFieldAction]
      );

      return (
        <WrappedComponent
          {...props}
          filterKey={filterKey}
          filters={filters || {}}
          setFiltersFieldAction={setFiltersFieldAction}
          onChangePagination={_onChangePagination}
        />
      );
    };
    return WithFilter;
  };

export default withFilter;

export const filterName = 'FILTER';
const FILTER_SET_FILTER_FIELD_BY_KEY =
  `${filterName}_` + 'SET_FILTER_FIELD_BY_KEY';

//Actions
export const setFiltersFieldByKey = (key, payload) => {
  return {
    type: FILTER_SET_FILTER_FIELD_BY_KEY,
    key,
    payload,
  };
};

//Reducer
export const filterRd = (state = fromJS({}), action) => {
  const { type, payload, key } = action;
  switch (type) {
    case FILTER_SET_FILTER_FIELD_BY_KEY: {
      return state.set(key, payload);
    }
    default:
      return state;
  }
};

//Selectors
const getFilterState = (state) => state[filterName];
export const selectFiltersByKey = (key) =>
  createSelector(getFilterState, (state) => state.getIn([key]));

const defaultFilter = { skip: 0, take: 10, page: 1, terms: '' };

export const FILTER_KEY = {
  MY_CAMPAIGNS: 'MY_CAMPAIGNS',
  MY_CREATIVES: 'MY_CREATIVES',
  MY_AUDIENCES: 'MY_AUDIENCES',
  CREATIVE_LIST: 'CREATIVE_LIST',
  MY_LIBRARY: 'MY_LIBRARY',
  STORE_TEMPLATE: 'STORE_TEMPLATE',
  PURCHASED_TEMPLATE: 'PURCHASED_TEMPLATE',
  CART: 'CART',
  BREADCRUMB: 'BREADCRUMB',
  CAMPAIGN_LIST: 'CAMPAIGN_LIST',
  ANALYTICS: 'ANALYTICS',
};

export const DEFAULT_FILTER = {
  [FILTER_KEY.MY_CAMPAIGNS]: {
    ...defaultFilter,
    status: undefined,
  },
  [FILTER_KEY.MY_LIBRARY]: {
    tab: '1',
  },
  [FILTER_KEY.MY_CREATIVES]: {
    ...defaultFilter,
    status: undefined,
    type: 1,
  },
  [FILTER_KEY.MY_AUDIENCES]: {
    ...defaultFilter,
    isActive: undefined,
  },
  [FILTER_KEY.CREATIVE_LIST]: {
    ...defaultFilter,
    type: undefined,
    creativeSpec: undefined,
  },
  [FILTER_KEY.STORE_TEMPLATE]: {
    ...defaultFilter,
    take: 16,
    type: undefined,
    templateSpec: undefined,
    price: undefined,
    category: undefined,
    date: [],
  },
  [FILTER_KEY.PURCHASED_TEMPLATE]: {
    ...defaultFilter,
    type: undefined,
    templateSpec: undefined,
  },
  [FILTER_KEY.CART]: [],
  [FILTER_KEY.BREADCRUMB]: {
    idParam: undefined,
    breadcrumbExtension: [],
  },
  [FILTER_KEY.ANALYTICS]: {
    campaignId: undefined,
    campaignName: undefined,
    date: [],
    reportMeta: undefined,
  },
  [FILTER_KEY.CAMPAIGN_LIST]: {
    ...defaultFilter,
  },
};
