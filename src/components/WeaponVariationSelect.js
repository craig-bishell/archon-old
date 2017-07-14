import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { WEAPON_VARIATIONS } from 'src/effects/data';
import capitalise from 'src/helpers/capitalise';
import { variationToOption } from 'src/helpers/selectOptions';

const WeaponVariationSelect = ({ variationType, variations, onChange }) => (
  <Select
    simpleValue
    value={variations[variationType]}
    valueRenderer={variation => variation.name}
    placeholder={`Select ${capitalise(variationType)} Variation`}
    options={WEAPON_VARIATIONS[variationType].map(variationToOption)}
    onChange={onChange}
  />
);

WeaponVariationSelect.propTypes = {
  variationType: PropTypes.string.isRequired,
  variations: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default WeaponVariationSelect;
