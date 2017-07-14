import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';

import Link from 'src/components/Link';

class RouterProvider extends Component {
  getChildContext() {
    return { router: this.router };
  }

  router = {
    buildUrl: (name, params) => {
      this.props.log.push(['buildUrl', name, params]);
      return `test/${name}`;
    },
    isActive: (url) => {
      this.props.log.push(['isActive', url]);
      return url === 'test-route2';
    }
  };

  render() {
    return this.props.children;
  }
}

RouterProvider.childContextTypes = {
  router: PropTypes.object
};

RouterProvider.propTypes = {
  children: PropTypes.node.isRequired,
  log: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

describe('Link', () => {
  it('should render inactive', () => {
    const log = [];
    log.push(['result', renderToStaticMarkup(
      <RouterProvider log={log}>
        <Link name="test-route1">
          <test-child />
        </Link>
      </RouterProvider>)]);
    expect(log).toMatchSnapshot();
  });

  it('should render active', () => {
    const log = [];
    log.push(['result', renderToStaticMarkup(
      <RouterProvider log={log}>
        <Link name="test-route2">
          <test-child />
        </Link>
      </RouterProvider>)]);
    expect(log).toMatchSnapshot();
  });

  it('should render with params', () => {
    const log = [];
    const testParams = { testParam1: 'testValue1', testParam2: 'testValue2' };
    log.push(['result', renderToStaticMarkup(
      <RouterProvider log={log}>
        <Link name="test-route1" params={testParams}>
          <test-child />
        </Link>
      </RouterProvider>)]);
    expect(log).toMatchSnapshot();
  });
});
