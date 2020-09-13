import React from 'react';
import {CANT_DECIDE} from "../../constants/general";


function Points({value}) {
  return <span>{value === CANT_DECIDE ? '?' : value}</span>;
}

export default Points;
