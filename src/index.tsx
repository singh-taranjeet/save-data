import React, { useEffect, useState, createContext } from 'react';
interface UpdateConfig {
  fetcher: () => any;
  name: string;
  checkForUpdate: boolean
}

const preName = "save-requests";

export const Context = createContext<any>({});

export const Provider = (props: {children: React.ReactNode}) => {

  const [store, setStore] = useState<any>({});

  async function updateStore(config: UpdateConfig) {

    const {fetcher, name, checkForUpdate = true} = config;

    const data = getItem(name);
    if(data && data !== "undefined" && !checkForUpdate) {
      setStore({
        ...store,
        [name]: JSON.parse(data)
      });
    }
    else {
      const response = await fetcher();
      setStore({
        ...store,
        [name]: response
      });

      if(response) {
        setItem(name, JSON.stringify(response));
      }
      else {
        deleteKey(name);
      }
    }
  }

  useEffect(() => {
    // initialise the store
    const s = {};

    if(localStorage && localStorage.length) {
      for ( var i: any = 0, len = localStorage.length; i < len; ++i ) {

        
        const key = localStorage.key(i) || "";

        if(key && key.includes(preName)) {
          const value = localStorage.getItem(key) || "{}";
          try {
            s[key.replace(`${preName}-`, "")] = JSON.parse(value);
            
          } catch (error) {
            console.error(`Problem with save-data storage KEY:${key}`);
          }
        }
      }
    }
    setStore(s);
  }, []);

  return (
    <Context.Provider value={{store, updateStore}}>
      {props.children}
    </Context.Provider>
  );

}

function getItem(key: string) {
  return localStorage.getItem(`${preName}-${key}`);
}

function setItem(key: string, value: string) {
  localStorage.setItem(`${preName}-${key}`, value);
}

function deleteKey(key: string) {
  localStorage.removeItem(`${preName}-${key}`);
}