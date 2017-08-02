import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { uniq } from 'lodash';

import { WEAPONS, WEAPON_TYPE_VARIATIONS, WEAPON_TYPE_MODIFICATIONS, MODIFICATIONS } from 'src/effects/data';
import { defaultValueToOption } from 'src/helpers/selectOptions';
import { getWeaponTypes } from 'src/helpers/weaponType';
import WeaponDetails from './WeaponDetails';
import WeaponTypeSelect from './WeaponTypeSelect';
import VariationSelect from './VariationSelect';

const isWeaponTypeOption = weaponType => weaponType.includes('|');


export default class Weapon extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      baseWeaponOptions: WEAPONS.map(defaultValueToOption),
      weaponTypeOptions: [],
      variationOptions: [],
      modificationOptions: [],

      baseWeapon: undefined,
      weaponTypes: {},
      variations: {},
      modifications: [],
    };
  }

  getWeaponTypeOptions = baseWeapon => baseWeapon &&
    baseWeapon.types
      .filter(type => isWeaponTypeOption(type));

  getVariationOptions = (baseWeapon, weaponTypes = {}, variations = {}) => {
    const selectedTypes = getWeaponTypes(baseWeapon, weaponTypes, variations);
    const options = selectedTypes && selectedTypes
      .reduce(
        (variationTypes, type) => WEAPON_TYPE_VARIATIONS[type]
          ? variationTypes.concat(WEAPON_TYPE_VARIATIONS[type])
          : variationTypes,
        []
      );
    return uniq(options);
  };

  getModificationOptions = (baseWeapon, weaponTypes = {}, variations = {}) => {
    const selectedTypes = getWeaponTypes(baseWeapon, weaponTypes, variations);
    const options = selectedTypes && selectedTypes
      .reduce(
        (modificationTypes, type) => WEAPON_TYPE_MODIFICATIONS[type]
          ? modificationTypes.concat(WEAPON_TYPE_MODIFICATIONS[type])
          : modificationTypes,
        []
      );

    const uniqueOptions = uniq(options);
    return uniqueOptions && uniqueOptions
      .reduce((modifications, modificationType) => [
        ...modifications,
        ...MODIFICATIONS[modificationType],
      ], []);
  };

  baseWeaponSelected = baseWeapon => this.setState({
    baseWeapon,
    weaponTypeOptions: this.getWeaponTypeOptions(baseWeapon),
    variationOptions: this.getVariationOptions(baseWeapon),
    modificationOptions: this.getModificationOptions(baseWeapon),

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
        variationOptions,
        modificationOptions: this.getModificationOptions(
          baseWeapon,
          newWeaponTypes,
          newVariations
        ),

        weaponTypes: newWeaponTypes,
        variations: newVariations,
      };
    });

  variationSelected = variation => this.setState(({ baseWeapon, weaponTypes, variations }) => {
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

    const variationOptions = this.getVariationOptions(
      baseWeapon,
      weaponTypes,
      newVariations
    );
    const validNewVariations = Object
      .keys(newVariations)
      .reduce((validVariations, variationType) => variationOptions.includes(variationType)
        ? {
          ...validVariations,
          [variationType]: newVariations[variationType],
        } : validVariations, {}
      );
    const modificationOptions = this.getModificationOptions(
      baseWeapon,
      weaponTypes,
      validNewVariations
    );
    return {
      variationOptions,
      modificationOptions,

      variations: validNewVariations,
    };
  });

  modificationSelected = modifications => this.setState({
    modifications: modifications.map(modification => modification.value),
  });

  render() {
    const {
      baseWeaponOptions,
      weaponTypeOptions,
      variationOptions,
      modificationOptions,

      baseWeapon,
      weaponTypes,
      variations,
      modifications,
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

        {modificationOptions.length > 0 &&
          <Select
            multi
            value={modifications.map(defaultValueToOption)}
            placeholder={'Select modifications'}
            options={modificationOptions.map(defaultValueToOption)}
            onChange={this.modificationSelected}
          />
        }

        {baseWeapon &&
          <WeaponDetails
            baseWeapon={baseWeapon}
            weaponTypes={weaponTypes}
            variations={variations}
            modifications={modifications}
          />
        }
      </div>
    );
  }
}
