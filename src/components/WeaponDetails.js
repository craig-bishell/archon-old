import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';

import capitalise from 'src/helpers/capitalise';
import { getWeaponTypeOptions, formatWeaponTypeOptions } from 'src/helpers/weaponType';
import { weaponShape } from './propTypeShapes';
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

export default class WeaponDetails extends Component {

  getWeapon = () => {
    const { baseWeapon, variations } = this.props;
    return Object
      .values(variations)
      .reduce((reduced, variation) => ({
        name: [variation.name, ...reduced.name],
        hit: (reduced.hit || 0) + (variation.hit || 0),
        endDmg: (reduced.endDmg || 0) + (variation.endDmg || 0),
        crit: (reduced.crit || 0) + (variation.crit || 0),
        rng: (reduced.rng || 0) + (variation.rng || 0),
        clips: (reduced.clips || 0) + (variation.clips || 0),
        ammo: variation.ammo
          ? [...reduced.ammo, variation.ammo]
          : reduced.ammo,
        load: (reduced.load || 0) + (variation.load || 0),
        rof: (reduced.rof || 0) + (variation.rof || 0),
        wgt: (reduced.wgt || 0) + (variation.wgt || 0),
        types: variation.types ?
          [...reduced.types, ...variation.types]
          : reduced.types,
        cost: (reduced.cost || 0) + (variation.cost || 0),
        specials: variation.specials
          ? [...reduced.specials, ...variation.specials]
          : reduced.specials,
        strongHits: variation.strongHits
          ? [...reduced.strongHits, ...variation.strongHits]
          : reduced.strongHits,
      }), {
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
        cost: baseWeapon.cost,
        specials: baseWeapon.specials || [],
        strongHits: baseWeapon.strongHits || [],
      });
  };

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
    } = this.getWeapon();

    return (
      <div className="weapon-details">
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
              <td>{cost}</td>
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
};
