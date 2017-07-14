import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const BASE_WEAPONS = [
  { label: 'Pistol',
    value: {
      name: 'Pistol', hit: 1, endDmg: 3, crit: 3, rng: 4, clips: 4, ammo: 'rofx6', load: 1, rof: 1, wgt: 1, type: ['gun'], cost: 1
    },
  },
  { label: 'Submachine Gun',
    value: {
      name: 'Submachine Gun', hit: 1, endDmg: 4, crit: 3, rng: 3, clips: 3, ammo: 'rofx3', load: 1, rof: 3, wgt: 1, type: ['gun'], cost: 2
    },
  },
  { label: 'Rifle',
    value: {
      name: 'Rifle', hit: 0, endDmg: 3, crit: 4, rng: 5, clips: 2, ammo: 'rofx4', load: 2, rof: 1, wgt: 2, type: ['gun'], cost: 2
    },
  },
  { label: 'Assault Rifle',
    value: {
      name: 'Assault Rifle', hit: 2, endDmg: 4, crit: 4, rng: 4, clips: 3, ammo: 'rofx4', load: 2, rof: 2, wgt: 2, type: ['gun'], cost: 3
    },
  },
  { label: 'Shotgun',
    value: {
      name: 'Shotgun', hit: 2, endDmg: 6, crit: 3, rng: 2, clips: 5, ammo: 'rofx1', load: 1, rof: 2, wgt: 3, type: ['gun|shell'], cost: 2
    },
  },
];

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


const capitalise = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const isWeaponTypeChoice = weaponType => weaponType.includes('|');
const getWeaponTypeChoiceOptions = weaponType => weaponType.split('|');
const formatWeaponTypeChoiceOptions = weaponTypeChoiceOptions => `${weaponTypeChoiceOptions
  .map(capitalise)
  .join(' or ')
} (Pick One)`;

export default class Weapon extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      baseWeapon: undefined,
      baseWeaponOptions: BASE_WEAPONS,
      weaponTypeChoices: {},
    };
  }

  baseWeaponSelected = baseWeapon => this.setState({
    baseWeapon,
    weaponTypeChoices: {},
  });

  weaponTypeChoiceSelected = choice => this.setState({
    weaponTypeChoices: {
      ...this.state.weaponTypeChoices,
      [choice.type]: choice.option,
    }
  });

  formatWeaponType = (weaponType) => {
    const typeOptions = getWeaponTypeChoiceOptions(weaponType);
    const selectedChoice = this.state.weaponTypeChoices[weaponType]
      && capitalise(this.state.weaponTypeChoices[weaponType]);
    return typeOptions.length === 1
        ? capitalise(typeOptions[0])
        : selectedChoice || formatWeaponTypeChoiceOptions(typeOptions);
  };

  formatWeaponTypes = types => types && types
    .map(this.formatWeaponType)
    .reduce((acc, type) => `${acc}, ${type}`);

  render() {
    return (
      <div className="weapon">
        <h3>Weapon Creator</h3>

        <Select
          name="base-weapon"
          simpleValue
          value={this.state.baseWeapon}
          valueRenderer={weapon => weapon.name}
          placeholder="Select a base weapon"
          options={this.state.baseWeaponOptions}
          onChange={this.baseWeaponSelected}
        />

        {this.state.baseWeapon && this.state.baseWeapon.type
          .filter(type => isWeaponTypeChoice(type))
          .map((type, idx) => {
            const typeOptions = getWeaponTypeChoiceOptions(type);
            return (
              <Select
                name={`weapon-type-${idx}`}
                simpleValue
                value={this.state.weaponTypeChoices[type]}
                valueRenderer={(choice) => {
                  console.debug(JSON.stringify(choice));
                  return choice && capitalise(choice);
                }}
                placeholder={formatWeaponTypeChoiceOptions(typeOptions)}
                options={typeOptions
                  .map(option => ({
                    label: capitalise(option),
                    value: {
                      type,
                      option,
                    }
                  }))
                }
                onChange={this.weaponTypeChoiceSelected}
              />
            );
          })
        }

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
          {this.state.baseWeapon &&
            <tr>
              <td>{this.state.baseWeapon.name}</td>
              <td>{formatHit(this.state.baseWeapon.hit)}</td>
              <td>{this.state.baseWeapon.endDmg}</td>
              <td>{this.state.baseWeapon.crit}</td>
              <td>{this.state.baseWeapon.rng}</td>
              <td>{this.state.baseWeapon.clips}</td>
              <td>{formatAmmo(this.state.baseWeapon.ammo, this.state.baseWeapon.rof)}</td>
              <td>{this.state.baseWeapon.load}</td>
              <td>{formatRoF(this.state.baseWeapon.rof)}</td>
              <td>{this.state.baseWeapon.wgt}</td>
              <td>{this.formatWeaponTypes(this.state.baseWeapon.type)}</td>
              <td>{this.state.baseWeapon.cost}</td>
            </tr>
          }
        </table>

      </div>
    );
  }
}
