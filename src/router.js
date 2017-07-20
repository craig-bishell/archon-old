import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

import * as Routes from 'src/constants/routes';

const routes = [{
  name: Routes.INDEX,
  path: '/',
}, {
  name: Routes.CHARACTER,
  path: '/counter',
}, {
  name: Routes.WEAPON,
  path: '/weapon',
}];

export default () =>
  createRouter(routes, {
    defaultRoute: 'index'
  }).usePlugin(browserPlugin());
