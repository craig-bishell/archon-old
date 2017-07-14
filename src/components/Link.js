import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Link extends Component {
  onClick = (event) => {
    if (!event.button && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      const { name, params, options } = this.props;
      this.context.router.navigate(name, params, options);
    }
  }

  render() {
    const { children, name, params } = this.props;
    const { router } = this.context;
    const active = router.isActive(name, params);
    const href = router.buildUrl(name, params);
    return (
      <a
        className={active ? 'active-link' : null}
        href={href}
        onClick={this.onClick}
      >{children}</a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  params: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

Link.contextTypes = {
  router: PropTypes.object.isRequired
};
