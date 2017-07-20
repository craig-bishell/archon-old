import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { startsWithSegment } from 'router5.helpers';

import Character from 'src/components/Character';
import Weapon from 'src/components/Weapon';
import Link from 'src/components/Link';
import NotFound from 'src/components/NotFound';
import * as Routes from 'src/constants/routes';

const renderContent = (testRoute) => {
  if (testRoute(Routes.CHARACTER) || testRoute(Routes.INDEX)) {
    return <Character />;
  } else if (testRoute(Routes.WEAPON)) {
    return <Weapon />;
  }

  return <NotFound />;
};

const Index = ({ route: { name } }) => {
  const testRoute = startsWithSegment(name);

  return (
    <div>
      <h1>Archon</h1>
      <nav>
        <Link name={Routes.CHARACTER}>Character</Link>&nbsp;|&nbsp;
        <Link name={Routes.WEAPON}>Weapon</Link>
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
