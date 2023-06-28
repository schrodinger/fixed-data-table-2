import React from 'react';

function ReorderCellFunction(props) {
  let style = {
    height: props.height,
    width: props.width,
    left: props.left,
    position: 'absolute',
  };
  return (
    <div className={props.className} style={style} ref={props.cellRef}>
      {props.renderReorderHandle()}
      {props.content}
    </div>
  );
}
export default ReorderCellFunction;
