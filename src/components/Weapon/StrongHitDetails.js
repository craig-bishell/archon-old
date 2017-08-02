import React from 'react';
import PropTypes from 'prop-types';

import { strongHitShape } from '../propTypeShapes';

const StrongHitDetails = ({ strongHit: { name, req, effect } }) => (
  <span className="strong-hit">Strong Hit: <b>{name}</b> ({req.join(', ')}) {effect}</span>
);

StrongHitDetails.propTypes = {
  strongHit: PropTypes.shape(strongHitShape).isRequired,
};

export default StrongHitDetails;
