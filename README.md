## Project Structure

src
├── assets //contain base css, images, fonts, icons
├── components
| ├── Atoms //Smallest components
| └── Organisms
| └── Templates
| └── Molecules //Combine component in Atoms
| └── Pages //container components for route
| └── Utilities //Custom third party js
├── constants
├── state // redux, saga, action, reducer
| ├── app
| └── auth
├── translations
└── router //define router for project
| ├── public
| └── private
├── utilities

## Core Library

- antd: https://ant.design/components/overview/
- axios: https://github.com/axios/axios/
- redux-saga: https://redux-saga.js.org/
- immutablejs: https://immutable-js.github.io/immutable-js/docs/#/
- reselect: https://github.com/reduxjs/reselect/
- react-intl: https://formatjs.io/docs/react-intl/
- atomics design pattern: https://bradfrost.com/blog/post/atomic-web-design/

## Naming branch

- For develop new feature
  dev/tk-XX-description
- For fix bug in staging
  stag/tk-XX-description
