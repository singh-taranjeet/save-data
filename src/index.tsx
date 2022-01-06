import React, { useEffect, useState } from 'react'
import {createContext} from 'react';
import styles from './styles.module.css'

interface Props {
  text: string
}
interface UpdateConfig {
  fetcher: () => any;
  url: string;
  checkForUpdate: boolean
}

const preName = "save-requests";

export const Context = createContext<any>({});

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const Provider = (props: {children: React.ReactNode}) => {

  const [store, setStore] = useState<any>({});

  async function updateStore(config: UpdateConfig) {

    const {fetcher, url, checkForUpdate = true} = config;

    const data = getItem(url);
    if(data && data !== "undefined" && !checkForUpdate) {
      setStore({
        ...store,
        [url]: JSON.parse(data)
      });
    }
    else {
      const response = await fetcher();
      setStore({
        ...store,
        [url]: response
      });

      if(response) {
        setItem(url, JSON.stringify(response));
      }
      else {
        deleteKey(url);
      }
    }
  }

  useEffect(() => {
    // initialise the store
    const s = {};
    const ls = {...localStorage};

    for(let prop in ls) {
      if(ls.hasOwnProperty(prop)) {
        const key = prop.replace(`${preName}-`, "");
        s[key] = JSON.parse(ls[prop]);
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