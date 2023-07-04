import React from 'react';

function CellLegacy(props) {
  return (
    <div
      className={props.classNameDefault}
      style={props.styleDefault}
      role={props.role}
    >
      {props.content}
    </div>
  );
}
export default CellLegacy;
