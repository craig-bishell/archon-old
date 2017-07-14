import React, { Component } from 'react';
import PropTypes from 'prop-types';

import capitalise from 'src/helpers/capitalise';
import { getWeaponTypeChoices, formatWeaponTypeChoices } from 'src/helpers/weapons';
import { weaponShape } from './propTypeShapes';
import { StrongHitDetails } from './StrongHitDetails';

const formatHit = hit => hit ? `+${hit}` : ''; // eslint-disable-line no-confusing-arrow

const formatAmmo = (ammo, rof) => {
  const hasRoF = ammo.includes('rofx');
  const ammoParts = ammo.split('rofx');
  return hasRoF
    ? Number(ammoParts[1]) * rof
    : ammo;
};

const formatRoF = rof => rof > 1 // eslint-disable-line no-confusing-arrow
  ? `${rof} (+${rof - 1}d6)`
  : rof;

export default class WeaponDetails extends Component {

  formatWeaponType = (weaponType) => {
    const { weaponTypeChoices } = this.props;
    const typeOptions = getWeaponTypeChoices(weaponType);
    const selectedChoice = weaponTypeChoices[weaponType]
      && capitalise(weaponTypeChoices[weaponType]);
    return typeOptions.length === 1
        ? capitalise(typeOptions[0])
        : selectedChoice || formatWeaponTypeChoices(typeOptions);
  };

  formatWeaponTypes = types => types && types
    .map(this.formatWeaponType)
    .reduce((acc, type) => `${acc}, ${type}`);

  render() {
    const { baseWeapon: {
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
      strongHits
    } } = this.props;
    return (
      <div className="weapon-details">
        <table>
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
          <tr>
            <td>{name}</td>
            <td>{formatHit(hit)}</td>
            <td>{endDmg}</td>
            <td>{crit}</td>
            <td>{rng}</td>
            <td>{clips}</td>
            <td>{formatAmmo(ammo, rof)}</td>
            <td>{load}</td>
            <td>{formatRoF(rof)}</td>
            <td>{wgt}</td>
            <td>{this.formatWeaponTypes(types)}</td>
            <td>{cost}</td>
          </tr>
          {specials && specials.map(special => (
            <tr>
              <td />
              <td colSpan="11">{special}</td>
            </tr>
          ))}
          {strongHits && strongHits.map(strongHit => (
            <tr>
              <td />
              <td colSpan="11"><StrongHitDetails strongHit={strongHit} /></td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

WeaponDetails.propTypes = {
  baseWeapon: PropTypes.shape(weaponShape).isRequired,
  weaponTypeChoices: PropTypes.object,
};
