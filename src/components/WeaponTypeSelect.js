import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import capitalise from 'src/helpers/capitalise';
import { weaponTypeToOption } from 'src/helpers/selectOptions';
import { getWeaponTypeOptions, formatWeaponTypeOptions } from 'src/helpers/weaponType';

const WeaponTypeSelect = ({ weaponType, weaponTypes, onChange }) => {
  const typeOptions = getWeaponTypeOptions(weaponType);
  const selectedType = weaponTypes &&
    weaponTypes[weaponType] &&
    capitalise(weaponTypes[weaponType]);

  const getOption = weaponTypeToOption(weaponType);

  return (
    <Select
      simpleValue
      value={selectedType && getOption(selectedType)}
      resetValue={getOption(null)}
      placeholder={formatWeaponTypeOptions(typeOptions)}
      options={typeOptions.map(getOption)}
      onChange={onChange}
    />
  );
};

WeaponTypeSelect.propTypes = {
  weaponType: PropTypes.string.isRequired,
  weaponTypes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default WeaponTypeSelect;
