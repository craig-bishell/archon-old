export const WEAPONS = [
  {
    name: 'Pistol', hit: 1, endDmg: 3, crit: 3, rng: 4, clips: 4, ammo: 'rofx6', load: 1, rof: 1, wgt: 1, types: ['gun'], cost: 1, specials: ['Small']
  },
  {
    name: 'Submachine Gun', hit: 1, endDmg: 4, crit: 3, rng: 3, clips: 3, ammo: 'rofx3', load: 1, rof: 3, wgt: 1, types: ['gun'], cost: 2
  },
  {
    name: 'Rifle', hit: 0, endDmg: 3, crit: 4, rng: 5, clips: 2, ammo: 'rofx4', load: 2, rof: 1, wgt: 2, types: ['gun'], cost: 2, specials: ['Strong Hit (5-6) with all RoF 1 Attack Rolls']
  },
  {
    name: 'Assault Rifle', hit: 2, endDmg: 4, crit: 4, rng: 4, clips: 3, ammo: 'rofx4', load: 2, rof: 2, wgt: 2, types: ['gun'], cost: 3, specials: ['Jam (-1)']
  },
  {
    name: 'Shotgun', hit: 2, endDmg: 6, crit: 3, rng: 2, clips: 5, ammo: 'rofx1', load: 1, rof: 2, wgt: 3, types: ['gun|shell'], cost: 2, specials: ['Strong Hit (5-6) vs Targets within first Range Increment']
  },
];

export const WEAPON_TYPE_VARIATIONS = {
  gun: ['gun', 'gunSize'],
  shell: ['shell', 'gunSize'],
  chemical: ['chemical', 'gunSize'],
};

export const WEAPON_TYPE_MODIFICATIONS = {
  gun: ['nonMelee', 'nonMeleeOrMeleeThrown', 'nonThrown'],
  shell: ['nonMelee', 'nonMeleeOrMeleeThrown', 'nonThrown'],
};

export const VARIATIONS = {
  gun: [
    {
      name: 'Burst Spores', hit: -2, rng: 1, types: ['chemical'], cost: 1, specials: ['Bio Tech', 'Splash +1|+1 End Dmg', 'Cost Spare Time Roll 10t']
    },
    {
      name: 'Gauss', rof: 1, cost: 1, specials: ['Jam (1-3)']
    },
    {
      name: 'Ion', clips: 2, specials: ['Energy']
    },
    {
      name: 'Irradiated', hit: -2, endDmg: 1, crit: 1, specials: ['Low Tech', 'Take 5 Endurance Damage every Action you spend Reloading or Un-Jamming this Weapon', 'Cost Spare Time Roll 14t', 'May not be taken by characters without Endurance (Henchmen, Drones or Companions)']
    },
    {
      name: 'Particle', crit: -1, clips: 'Inf', ammo: 'rofx-1', cost: -1, specials: ['Jam (1-5)', 'Energy', 'Does not Work in Void']
    },
    {
      name: 'Rail', crit: 1, rng: 1, ammo: 'rofx-1', load: 1, cost: 1, specials: ['Lock On +2', 'Jam (1-5)', 'Cost Spare Time Roll 14t']
    },
    {
      name: 'Self-Propelled', rng: 1, specials: ['Low Tech', 'Works in Liquid']
    },
    {
      name: 'Spine Launcher', endDmg: 1, crit: -1, ammo: 'rofx-1', load: -1, rof: 2, cost: 1, specials: ['Bio Tech']
    },
  ],
  shell: [
    {
      name: 'Dispersion', endDmg: -1, crit: -1, types: ['chemical'], specials: ['Splash +1', 'Low Tech']
    },
    {
      name: 'Dummy', endDmg: -3, crit: -3, cost: -1, specials: ['Low Tech', 'Blunt'], strongHits: [{ name: 'Fake Shock', req: ['Hit'], effect: 'Target is Suppressed' }]
    },
    {
      name: 'Electro-Gravity', endDmg: -2, crit: -2, clips: -1, cost: '14t', specials: ['Electro-Gravity', 'Blunt'], strongHits: [{ name: 'Float Targets', req: ['Hit'], effect: 'Debuff All Targets: -1 Cover Step, reduce all Movement by 2 (minimum 0) and Push moves Targets 1 additional space until your next Turn' }]
    },
    {
      name: 'Kinetic', hit: 2, specials: ['Low Tech']
    },
    {
      name: 'Shrapnel', endDmg: 2, crit: -1, specials: ['Splash +1', 'Low Tech']
    },
    {
      name: 'Smoke', rng: 1, clips: 1, cost: -1, specials: ['Splash +1', 'Low Tech', 'Creates an Area of Limited Vision (Light Cover (+2)) for 3 minutes', 'Does not Work in Void']
    },
    {
      name: 'Snare', hit: 2, endDmg: -2, crit: -2, rng: 1, types: ['impairment'], specials: ['Low Tech', 'Never add Str to your Hit', 'any Escape vs Grab is done vs Defence 12+Crit Dmg', 'you never count as Grabbing Target']
    },
  ],
  chemical: [
    {
      name: 'Antimonic Acid', hit: -2, crit: 1, cost: 1, specials: ['Burn']
    },
    {
      name: 'Cryo-Gel', hit: 1, cost: '10t', specials: ['Bio Tech'], strongHits: [{ name: 'Freeze', req: ['Hit'], effect: 'Debuff Target: Reduce all Movement by 1 (minimum 0) until they receive a First Aid Healing Roll' }]
    },
    {
      name: 'Napalm', endDmg: 1, specials: ['Burn', 'Does not Work in Void']
    },
    {
      name: 'Neurotoxin', endDmg: 1, crit: -1, cost: 1, specials: ['Bio Tech', 'Critical Hit Attribute Damage Location 1d3+3 (normally 1d6)', 'Cost Spare Time Roll 14t'], strongHits: [{ name: 'Neurotoxin', req: ['Hit', '1 use per RoF'], effect: 'Non Robot Target takes 1 Attribute Damage (no Armour) to a random (1d3+3) Attribute' }]
    },
    {
      name: 'Synthetic Poison', crit: -2, specials: ['Bio Tech', '+2 Endurance Damage vs Targets at 0 Endurance', 'Does not Work in Void'], strongHits: [{ name: 'Synthetic Poison', req: ['Hit'], effect: 'Non Robot Target takes 3 Endurance Damage at the Start of their Turn until they receive Paramedics or Extended Care (Synthetic Poison Effect can Stack up to 4 times)' }]
    },
  ],
  gunSize: [
    {
      name: 'Body Mounted', rng: -1, load: 1, cost: 1, specials: ['Gauntlet', '-2 Draw time', 'Immune to Strong Hit: Disarm']
    },
    {
      name: 'Mounted Weapon', endDmg: -1, crit: -1, rng: -1, clips: -1, cost: -1, specials: ['Choose a Weapon of Weight 2 or more for this Weapon to be Attached to, Attached Weapon has -1 Hit and +1 Weight', 'Drawn with Attached Weapon (0 Hands for this Weapon)', '+1 Reload', 'Weight 1-3 Weapons only', 'Not Thrown Weapon without Launcher Modification'], strongHits: [{ name: 'Combo Strike', req: ['Hit'], effect: 'Make a free Attack with Main Weapon at the same Target with Hit -2' }]
    },
    {
      name: 'Tiny', endDmg: -1, crit: -1, rng: -2, clips: -1, load: -1, wgt: -1, cost: -1, specials: ['If Weight is under 2 it is ‘Small’', '+4 to hide Weapon']
    },
  ],
};

export const MODIFICATIONS = {
  nonMeleeOrMeleeThrown: [
    {
      name: 'Advanced Ammo', hit: 1, rng: 1, cost: 1
    },
  ],
  nonMelee: [
    {
      name: 'Advanced Modification', cost: 1, specials: ['Bio Tech|Blunt|Burn|Energy|Low Tech|type:Psionic']
    },
    {
      name: 'Archon Round', rng: 1, cost: '18t', specials: ['Optional', 'For a single RoF 1 Attack, Strong Hit +1, Pen 1 min 4']
    },
    {
      name: 'Archon Tech', endDmg: -1, rng: 1, clips: -1, cost: 5, specials: ['Archon Tech', '-Low Tech', 'Strong Hit +1', 'Requires Secret Knowledge to build if not found']
    },
  ],
  nonThrown: [
    {
      name: 'Dual Wield', hit: -2, endDmg: 2, clips: -1, load: 1, rof: 1, wgt: 1, cost: 1, specials: ['Optional', '1 Handed Weapons only (usually Weight 1)', 'If Gauntlet: takes 2 Gauntlet Slots']
    },
  ]
};
