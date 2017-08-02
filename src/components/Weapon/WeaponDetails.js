import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sum, uniq } from 'lodash';

import weaponImage from 'assets/weapon.png';

import capitalise from 'src/helpers/capitalise';
import { getWeaponTypeOptions, formatWeaponTypeOptions } from 'src/helpers/weaponType';
import { weaponShape } from '../propTypeShapes';
import StrongHitDetails from './StrongHitDetails';

const formatHit = hit => hit // eslint-disable-line no-nested-ternary
  ? hit > 0
    ? `+${hit}`
    : hit
  : '';

const formatAmmo = (ammo, rof) => {
  const hasRoF = ammo.includes('rofx');
  const ammoParts = ammo.split('rofx');
  return hasRoF
    ? Number(ammoParts[1]) * rof
    : ammo;
};

const formatAmmos = (ammos, rof) => ammos
  .map(ammo => formatAmmo(ammo, rof))
  .reduce((totalAmmo, ammo) => totalAmmo + ammo);

const formatRoF = rof => rof > 1
  ? `${rof} (+${rof - 1}d6)`
  : rof;

const formatCost = (costs) => {
  const totalCost = sum(costs.filter(cost => Number.isInteger(cost)));
  const spareTimeRolls = costs.filter(cost => !Number.isInteger(cost));
  return `${totalCost}${spareTimeRolls.length ? `(${spareTimeRolls.join(',')})` : ''}`;
};

const formatSpecials = specials => (
  <tr>
    <td />
    <td colSpan="11">{specials.join(', ')}</td>
  </tr>
);

const formatStrongHits = strongHits => strongHits.map(strongHit => (
  <tr key={strongHit.name}>
    <td />
    <td colSpan="11"><StrongHitDetails strongHit={strongHit} /></td>
  </tr>
));

const applyToWeapon = (weapon, toApply) => ({
  name: [toApply.name, ...weapon.name],
  hit: (weapon.hit || 0) + (toApply.hit || 0),
  endDmg: (weapon.endDmg || 0) + (toApply.endDmg || 0),
  crit: (weapon.crit || 0) + (toApply.crit || 0),
  rng: (weapon.rng || 0) + (toApply.rng || 0),
  clips: (weapon.clips || 0) + (toApply.clips || 0),
  ammo: toApply.ammo
    ? [...weapon.ammo, toApply.ammo]
    : weapon.ammo,
  load: (weapon.load || 0) + (toApply.load || 0),
  rof: (weapon.rof || 0) + (toApply.rof || 0),
  wgt: (weapon.wgt || 0) + (toApply.wgt || 0),
  types: toApply.types ?
    [...weapon.types, ...toApply.types]
    : weapon.types,
  cost: toApply.cost
    ? [...weapon.cost, ...toApply.cost]
    : weapon.cost,
  specials: toApply.specials
    ? [...weapon.specials, ...toApply.specials]
    : weapon.specials,
  strongHits: toApply.strongHits
    ? [...weapon.strongHits, ...toApply.strongHits]
    : weapon.strongHits,
});

export default class WeaponDetails extends Component {

  getBaseWeapon = () => {
    const { baseWeapon } = this.props;
    return {
      name: [baseWeapon.name],
      hit: baseWeapon.hit,
      endDmg: baseWeapon.endDmg,
      crit: baseWeapon.crit,
      rng: baseWeapon.rng,
      clips: baseWeapon.clips,
      ammo: [baseWeapon.ammo],
      load: baseWeapon.load,
      rof: baseWeapon.rof,
      wgt: baseWeapon.wgt,
      types: baseWeapon.types,
      cost: baseWeapon.cost || [],
      specials: baseWeapon.specials || [],
      strongHits: baseWeapon.strongHits || [],
    };
  };

  applyVariations = (weapon) => {
    const { variations } = this.props;
    return Object
      .values(variations)
      .reduce(applyToWeapon, weapon);
  };

  applyModifications = (weapon) => {
    const { modifications } = this.props;
    return modifications
      .reduce(applyToWeapon, weapon);
  }

  formatWeaponType = (weaponType) => {
    const { weaponTypes } = this.props;
    const typeOptions = getWeaponTypeOptions(weaponType);
    const selectedChoice = weaponTypes[weaponType]
      && capitalise(weaponTypes[weaponType]);
    return typeOptions && typeOptions.length === 1
        ? capitalise(typeOptions[0])
        : selectedChoice || formatWeaponTypeOptions(typeOptions);
  };

  formatWeaponTypes = types => types && uniq(types)
    .map(this.formatWeaponType)
    .reduce((acc, type) => `${acc}, ${type}`);

  render() {
    const {
      name,
      hit,
      endDmg,
      crit,
      rng,
      clips,
      ammo,
      load,
      rof,
      wgt,
      types,
      cost,
      specials,
      strongHits,
    } = this.applyModifications(this.applyVariations(this.getBaseWeapon()));

    return (
      <div className="weapon-details">
        {this.getBaseWeapon() && <img src={weaponImage} alt="Weapon" />}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Hit</th>
              <th>End Dmg</th>
              <th>Crit</th>
              <th>Rng</th>
              <th>Clips</th>
              <th>Ammo</th>
              <th>Load</th>
              <th>RoF</th>
              <th>Wgt</th>
              <th>Weapon Type</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name.join(' ')}</td>
              <td>{formatHit(hit)}</td>
              <td>{endDmg}</td>
              <td>{crit}</td>
              <td>{rng}</td>
              <td>{clips}</td>
              <td>{formatAmmos(ammo, rof)}</td>
              <td>{load}</td>
              <td>{formatRoF(rof)}</td>
              <td>{wgt}</td>
              <td>{this.formatWeaponTypes(types)}</td>
              <td>{formatCost(cost)}</td>
            </tr>
            {specials && formatSpecials(specials)}
            {strongHits && formatStrongHits(strongHits)}
          </tbody>
        </table>
      </div>
    );
  }
}

WeaponDetails.propTypes = {
  baseWeapon: PropTypes.shape(weaponShape).isRequired,
  weaponTypes: PropTypes.object,
  variations: PropTypes.object,
  modifications: PropTypes.arrayOf(PropTypes.object),
};
