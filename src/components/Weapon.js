import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { uniq } from 'lodash';

import { BASE_WEAPONS, WEAPON_TYPES } from 'src/effects/data';
import { baseWeaponToOption } from 'src/helpers/selectOptions';
import { getWeaponTypeChoices } from 'src/helpers/weapons';
import WeaponDetails from './WeaponDetails';
import WeaponTypeChoiceSelect from './WeaponTypeChoiceSelect';
import WeaponVariationSelect from './WeaponVariationSelect';

const isWeaponTypeChoice = weaponType => weaponType.includes('|');

export default class Weapon extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      baseWeaponOptions: BASE_WEAPONS.map(baseWeaponToOption),
      variationOptions: [],

      baseWeapon: undefined,
      weaponTypes: {},
      variations: {},
      modifications: [],
    };
  }

  baseWeaponSelected = (baseWeapon) => {
    const reduced = baseWeapon.types
      .reduce((variationTypes, weaponType) =>
        variationTypes.concat(getWeaponTypeChoices(weaponType)
          .reduce((types, type) => types.concat(WEAPON_TYPES[type]), [])
        )
      , []);
    return this.setState({
      baseWeapon,

      variationOptions: uniq(reduced),

      weaponTypeChoices: {},
      variations: {},
      modifications: [],
    });
  };

  weaponTypeSelected = weaponType => this.setState({
    weaponTypeChoices: {
      ...this.state.weaponTypeChoices,
      [weaponType.type]: weaponType.value,
    }
  });

  variationSelected = variation => this.setState({
    variations: {
      ...this.state.variations,
      [variation.type]: variation.value,
    }
  });

  render() {
    const {
      baseWeaponOptions,
      variationOptions,

      baseWeapon,
      weaponTypeChoices,
      variations,
    } = this.state;
    return (
      <div className="weapon">
        <h3>Weapon Creator</h3>

        <Select
          simpleValue
          value={baseWeapon}
          valueRenderer={weapon => weapon.name}
          placeholder="Select a base weapon"
          options={baseWeaponOptions}
          onChange={this.baseWeaponSelected}
        />

        {baseWeapon && baseWeapon.types
          .filter(type => isWeaponTypeChoice(type))
          .map(type => (
            <WeaponTypeChoiceSelect
              weaponType={type}
              weaponTypeChoices={weaponTypeChoices}
              onChange={this.weaponTypeSelected}
            />
          ))
        }

        {variationOptions && variationOptions
          .map(variationOption => (
            <WeaponVariationSelect
              variationType={variationOption}
              variations={variations}
              onChange={this.weaponVariationSelected}
            />
          ))
        }

        {baseWeapon &&
          <WeaponDetails
            baseWeapon={this.state.baseWeapon}
            weaponTypeChoices={this.state.weaponTypeChoices}
          />
        }
      </div>
    );
  }
}
