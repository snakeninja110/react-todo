import React from 'react';
import PropTypes from 'prop-types';

const Link = ({active, children, setFilter}) => (
  <a
    className={active ? 'selected' : ''}
    onClick={() => setFilter()}>
    { children }
  </a>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default Link;
