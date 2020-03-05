import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

export default forwardRef((props: any, ref: any) => (
  <NavLink innerRef={ref} {...props} />
));
