import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { WEAPON_VARIATIONS } from 'src/effects/data';
import capitalise from 'src/helpers/capitalise';
import { variationToOption } from 'src/helpers/selectOptions';

const VariationSelect = ({ variationType, variations, onChange }) => {
  const getOption = variationToOption(variationType);
  const selectedVariation = variations && variations[variationType];

  return (
    <Select
      simpleValue
      value={selectedVariation && getOption(selectedVariation)}
      resetValue={getOption(null)}
      placeholder={`Select ${capitalise(variationType)} Variation`}
      options={WEAPON_VARIATIONS[variationType].map(getOption)}
      onChange={onChange}
    />
  );
};

VariationSelect.propTypes = {
  variationType: PropTypes.string.isRequired,
  variations: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default VariationSelect;
