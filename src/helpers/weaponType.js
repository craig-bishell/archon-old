import capitalise from './capitalise';

export const getWeaponTypeOptions = weaponType => weaponType &&
  weaponType.split('|');

export const formatWeaponTypeOptions = weaponTypeArray => weaponTypeArray &&
  `${weaponTypeArray
    .map(capitalise)
    .join(' or ')
  } (Pick One)`;

export const getWeaponTypes = (baseWeapon, weaponTypes = {}, variations = {}) => {
  const baseWeaponTypes = baseWeapon && baseWeapon.types
    .map(type => (weaponTypes && weaponTypes[type]) || type);

  const variationTypes = variations && Object
    .values(variations)
    .reduce((types, variation) => types.concat(variation.types), []);

  return [].concat(baseWeaponTypes).concat(variationTypes);
};
