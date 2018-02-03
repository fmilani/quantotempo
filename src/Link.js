import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/** Wraps react-router's link component to remove the anchor style */
const Link = ({ children, ...props }) => (
  <RouterLink
    style={{ textDecoration: 'inherit', color: 'inherit' }}
    {...props}
  >
    {children}
  </RouterLink>
);

export default Link;
