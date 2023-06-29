import React from 'react';

function CellLegacy(props) {
  return (
    <div className={props.className} style={props.style}>
      {props.content}
    </div>
  );
}
export default CellLegacy;
