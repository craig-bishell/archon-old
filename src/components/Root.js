import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { startsWithSegment } from 'router5.helpers';

import Counter from 'src/components/Counter';
import HelloUser from 'src/components/HelloUser';
import Weapon from 'src/components/Weapon';
import Link from 'src/components/Link';
import NotFound from 'src/components/NotFound';
import * as Routes from 'src/constants/routes';

const renderContent = (testRoute) => {
  if (testRoute(Routes.WEAPON) || testRoute(Routes.INDEX)) {
    return <Weapon />;
  } else if (testRoute(Routes.HELLO_USER)) {
    return <HelloUser />;
  } else if (testRoute(Routes.COUNTER)) {
    return <Counter />;
  }

  return <NotFound />;
};

const Index = ({ route: { name } }) => {
  const testRoute = startsWithSegment(name);

  return (
    <div>
      <h1>Archon</h1>
      <nav>
        <Link name={Routes.WEAPON}>Weapon</Link>&nbsp;|&nbsp;
        <Link name={Routes.COUNTER}>Counter</Link>&nbsp;|&nbsp;
        <Link name={Routes.HELLO_USER}>Hello User</Link>
      </nav>
      <div>
        {renderContent(testRoute)}
      </div>
    </div>
  );
};

Index.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ...routeNodeSelector()(state)
});

export default connect(
  mapStateToProps
)(Index);
