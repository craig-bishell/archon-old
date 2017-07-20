import capitalise from './capitalise';

export const getWeaponTypeOptions = weaponType => weaponType &&
  weaponType.split('|');

export const formatWeaponTypeOptions = weaponTypeArray => weaponTypeArray &&
  `${weaponTypeArray
    .map(capitalise)
    .join(' or ')
  } (Pick One)`;

export const getWeaponTypes = (baseWeapon, weaponTypes = {}) => baseWeapon &&
  baseWeapon.types
    .map(type => (weaponTypes && weaponTypes[type]) || type);
