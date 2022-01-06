import React from 'react'

import { ExampleComponent, Provider } from 'cache-requests'
import 'cache-requests/dist/index.css';
import { List } from './List';

export default (theme: any) => {
  console.log("context", theme);
  return (
    <Provider>
      <ExampleComponent text="Create React Library Example 😄" />
      <List />
    </Provider>
  );
}


