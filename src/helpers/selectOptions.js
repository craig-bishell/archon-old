import capitalise from './capitalise';

const toValueName = value => value && value.name;
const toValueIdentity = value => value;

const valueToOption = (toLabel, toValue) => value => ({
  label: toLabel(value),
  value: toValue(value),
});

export const defaultValueToOption = valueToOption(toValueName, toValueIdentity);

export const weaponTypeToOption = type => valueToOption(
  value => value && capitalise(value),
  value => ({
    type,
    value,
  })
);

export const variationToOption = type => valueToOption(
  toValueName,
  value => ({
    type,
    value,
  })
);
