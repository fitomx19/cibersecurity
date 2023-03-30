import React, { useState } from 'react';
import SessionContext from '../Context/context';

function SessionProvider(props) {
  const [logged, setLogged] = useState(null);

  return (
    <SessionContext.Provider value={{ logged, setLogged }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
