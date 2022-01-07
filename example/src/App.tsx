import React from 'react';
import { Provider } from 'cache-requests';
import { List } from './List';

export default (theme: any) => {
  console.log("context", theme);
  return (
    <Provider>
      <List />
    </Provider>
  );
}


