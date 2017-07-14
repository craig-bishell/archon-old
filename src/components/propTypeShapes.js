import PropTypes from 'prop-types';

export const strongHitShape = {
  name: PropTypes.string.isRequired,
  req: PropTypes.arrayOf(PropTypes.string).isRequired,
  effect: PropTypes.string.isRequired,
};

export const weaponShape = {
  name: PropTypes.string.isRequired,
  hit: PropTypes.number.isRequired,
  endDmg: PropTypes.number.isRequired,
  crit: PropTypes.number.isRequired,
  rng: PropTypes.number.isRequired,
  clips: PropTypes.number.isRequired,
  ammo: PropTypes.string.isRequired,
  rof: PropTypes.number.isRequired,
  load: PropTypes.number.isRequired,
  wgt: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  cost: PropTypes.number.isRequired,
  specials: PropTypes.arrayOf(PropTypes.string),
  strongHits: PropTypes.arrayOf(strongHitShape),
};
