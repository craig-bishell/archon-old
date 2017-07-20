import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { uniq } from 'lodash';

import { BASE_WEAPONS, WEAPON_TYPES } from 'src/effects/data';
import { baseWeaponToOption } from 'src/helpers/selectOptions';
import { getWeaponTypes } from 'src/helpers/weaponType';
import WeaponDetails from './WeaponDetails';
import WeaponTypeSelect from './WeaponTypeSelect';
import VariationSelect from './VariationSelect';

const isWeaponTypeOption = weaponType => weaponType.includes('|');


export default class Weapon extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      baseWeaponOptions: BASE_WEAPONS.map(baseWeaponToOption),
      weaponTypeOptions: [],
      variationOptions: [],
      modificationOptions: [],

      baseWeapon: undefined,
      weaponTypes: {},
      variations: {},
      modifications: {},
    };
  }

  getWeaponChoiceOptions = baseWeapon => baseWeapon &&
    baseWeapon.types
      .filter(type => isWeaponTypeOption(type));

  getVariationOptions = (baseWeapon, weaponTypes = {}) => uniq(
    getWeaponTypes(baseWeapon, weaponTypes)
      .reduce(
        (variationTypes, type) => WEAPON_TYPES[type]
          ? variationTypes.concat(WEAPON_TYPES[type])
          : variationTypes,
        []
      )
  );

  getModificationOptions = () => {};

  baseWeaponSelected = baseWeapon => this.setState({
    baseWeapon,
    weaponTypeOptions: this.getWeaponChoiceOptions(baseWeapon),
    variationOptions: this.getVariationOptions(baseWeapon),

    weaponTypes: {},
    variations: {},
    modifications: [],
  });

  weaponTypeSelected = weaponType => this.setState(
    ({ baseWeapon, weaponTypes, variations }) => {
      const newWeaponTypes = weaponType.value
        ? {
          ...weaponTypes,
          [weaponType.type]: weaponType.value,
        } : Object
            .keys(weaponTypes)
            .filter(currentType => currentType !== weaponType.type)
            .reduce((currentTypes, nextType) => ({
              ...currentTypes,
              [nextType]: weaponTypes[nextType],
            }), {});
      const variationOptions = this.getVariationOptions(baseWeapon, newWeaponTypes);
      const newVariations = variationOptions
        .reduce((currentVariations, variationType) => variations[variationType]
          ? {
            ...currentVariations,
            [variationType]: variations[variationType],
          } : currentVariations, {});

      return {
        weaponTypes: newWeaponTypes,
        variationOptions,
        variations: newVariations,
      };
    });

  variationSelected = variation => this.setState(({ variations }) => {
    const newVariations = variation.value
      ? {
        ...variations,
        [variation.type]: variation.value,
      } : Object
            .keys(variations)
            .filter(currentVar => currentVar !== variation.type)
            .reduce((currentVars, nextVar) => ({
              ...currentVars,
              [nextVar]: variations[nextVar],
            }), {});

    return { variations: newVariations };
  });

  render() {
    const {
      baseWeaponOptions,
      weaponTypeOptions,
      variationOptions,

      baseWeapon,
      weaponTypes,
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

        {weaponTypeOptions && weaponTypeOptions
          .map(type => (
            <WeaponTypeSelect
              key={type}
              weaponType={type}
              weaponTypes={weaponTypes}
              onChange={this.weaponTypeSelected}
            />
          ))
        }

        {variationOptions && variationOptions
          .map(variationOption => (
            <VariationSelect
              key={variationOption}
              variationType={variationOption}
              variations={variations}
              onChange={this.variationSelected}
            />
          ))
        }

        {baseWeapon &&
          <WeaponDetails
            baseWeapon={baseWeapon}
            weaponTypes={weaponTypes}
            variations={variations}
          />
        }
      </div>
    );
  }
}
