import React from 'react';
import FixedDataTableTranslateDOMPosition from 'FixedDataTableTranslateDOMPosition';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('test translate dom position', () => {
  const initialStyle = {
    left: '3px',
    top: '4px',
  };
  const x = 7;
  const y = 10;

  it('initial render', () => {
    let updatedStyle = { ...initialStyle };
    const translatedDomPosition = FixedDataTableTranslateDOMPosition(updatedStyle, x, y, true);
    expect(updatedStyle).not.toEqual(initialStyle);
    expect(updatedStyle).toEqual({ left: `${x}px`, top: `${y}px` });
  })

  it('not initial render', () => {
    let updatedStyle = { ...initialStyle };
    const translatedDomPosition = FixedDataTableTranslateDOMPosition(updatedStyle, x, y, false);
    expect(updatedStyle).not.toEqual(initialStyle);
    expect(updatedStyle).toEqual({ left: `${x}px`, top: `${y}px` });
  })
});

// TODO: write more tests for each function