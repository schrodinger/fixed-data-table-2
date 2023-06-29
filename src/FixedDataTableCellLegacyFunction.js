import React from 'react';

function CellLegacy(props) {
  return (
    <div className={props.className_default} style={props.style_default}>
      {props.content}
    </div>
  );
}
export default CellLegacy;
