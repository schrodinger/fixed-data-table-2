/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import React from 'react';
import { FixedDataTableContext } from '../FixedDataTableContext';

// NOTE (pradeep): React HOC that listens to changes in FDT's context and provides the context value down to children.
// This internally doesn't use React's Context.Consumer API, but instead uses FixedDataTableContext's subscriber API to listen to changes.
// The subscription API ensures that even if the component is rendered in an external VDOM which is not under the FDT instance, it can still detect context value changes.
class ExternalContextProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    const FixedDataTableContextValue = props.value;

    this.unsubscribe = FixedDataTableContextValue.subscribe((contextValue) => {
      this.setState({ FixedDataTableContextValue: contextValue });
    });

    this.state = { FixedDataTableContextValue };
  }

  componentWillUnmount() {
    // make sure we cleanup our subscription to FDT's context
    this.unsubscribe();
  }

  render() {
    const { FixedDataTableContextValue } = this.state;
    return (
      <FixedDataTableContext.Provider value={FixedDataTableContextValue}>
        {this.props.children}
      </FixedDataTableContext.Provider>
    );
  }
}

export default ExternalContextProvider;
