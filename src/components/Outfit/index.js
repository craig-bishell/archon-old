import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { OUTFITS } from 'src/effects/data';
import { defaultValueToOption } from 'src/helpers/selectOptions';

export default class Outfit extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      baseOutfitOptions: OUTFITS.map(defaultValueToOption),

      baseOutfit: undefined,
    };
  }

  baseOutfitSelected = baseOutfit => this.setState({
    baseOutfit,
  });

  render() {
    const {
      baseOutfitOptions,

      baseOutfit,
    } = this.state;
    return (
      <div className="outfit">
        <h3>Outfit Creator</h3>

        <Select
          simpleValue
          value={baseOutfit}
          valueRenderer={outfit => outfit.name}
          placeholder="Select a base outfit"
          options={baseOutfitOptions}
          onChange={this.baseOutfitSelected}
        />
      </div>
    );
  }
}
