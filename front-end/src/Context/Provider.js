import React from 'react';
import ContextGlobal from './ContextGlobal';

function Provider({ children }) {

  const contextValue = { };
  return (
    <ContextGlobal.Provider value={ contextValue }>
      {children}
    </ContextGlobal.Provider>
  );
};

export default Provider;
