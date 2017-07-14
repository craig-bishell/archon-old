import capitalise from './capitalise';

export const getWeaponTypeChoices = weaponType => weaponType.split('|');

export const formatWeaponTypeChoices = weaponTypeArray => `${weaponTypeArray
  .map(capitalise)
  .join(' or ')
} (Pick One)`;
