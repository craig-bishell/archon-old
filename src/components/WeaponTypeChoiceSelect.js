import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import capitalise from 'src/helpers/capitalise';
import { weaponTypeToOption } from 'src/helpers/selectOptions';
import { getWeaponTypeChoices, formatWeaponTypeChoices } from 'src/helpers/weapons';

const WeaponTypeChoiceSelect = ({ weaponType, weaponTypeChoices, onChange }) => {
  const typeOptions = getWeaponTypeChoices(weaponType);
  const selectedType = weaponTypeChoices[weaponType]
    && capitalise(weaponTypeChoices[weaponType]);

  return (
    <Select
      simpleValue
      value={selectedType && {
        type: weaponType,
        value: selectedType,
      }}
      valueRenderer={value => value.value}
      placeholder={formatWeaponTypeChoices(typeOptions)}
      options={typeOptions
        .map(weaponTypeToOption(weaponType))
      }
      onChange={onChange}
    />
  );
};

WeaponTypeChoiceSelect.propTypes = {
  weaponType: PropTypes.string.isRequired,
  weaponTypeChoices: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default WeaponTypeChoiceSelect;
