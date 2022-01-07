# @minimal_ui/save_data

> Save all data in localstorage. For example http api response, previous selected theme, login related info, etc.

[![NPM](https://img.shields.io/npm/v/@minimal_ui/save_data.svg)](https://www.npmjs.com/package/@minimal_ui/save_data) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @minimal_ui/save_data
```
## How it works
```
It saves all the data in the localstorage. 
For every request to udpate the data it checks if the data is already stored or not.
If the data is present then it returns the saved data.
Else it calls the method to refresh the data.
```

## Usage

```tsx

// Root component
import React from 'react'
import { Provider } from '@minimal_ui/save_data';
import { List } from './List';

export default () => {
  // Add provider to parent component
  return (
    <Provider>
      <List />
    </Provider>
  );
}

// List component
import React, { useContext } from "react";
import { Context } from '@minimal_ui/save_data'

export const List = () => {

    const { updateStore, store } = useContext(Context);
  
    // Fetch the list of data
    async function fetchUsers() {
        const res: any = await fetch("https://reqres.in/api/users?page=2");
        return res.json();
    }
  
    function onClick() {
        updateStore({
            // Method that will fetch the list of data
            fetcher: fetchUsers,
            // Any unique name
            url: "fetch-users",
            // boolean to check for update(default = true)
            checkForUpdate: false
        });
    }

    return (
      <div>
        <button onClick={onClick}>Fetch Users</button>
        {store?["fetch-users"]?.data?.map((item: any) =>{
            return (
                <div key={item.id}>{item.email}</div>
            );
        })}
      </div>
    );
  
  }
```

## License

MIT © [singh-taranjeet](https://github.com/singh-taranjeet)
