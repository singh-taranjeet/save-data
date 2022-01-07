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
    const ls = {
      red: '{"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://reqres.in/img/faces/7-image.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://reqres.in/img/faces/8-image.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://reqres.in/img/faces/9-image.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://reqres.in/img/faces/10-image.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://reqres.in/img/faces/11-image.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://reqres.in/img/faces/12-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}'
    };


    if(localStorage && localStorage.length) {
      for ( var i: any = 0, len = localStorage.length; i < len; ++i ) {

        const value = localStorage.getItem(localStorage.key(i) || "");
        const key = localStorage.key(i) || "";

        if(value && key) {
          try {
            s[key.replace(`${preName}-`, "")] = JSON.parse(value);
            
          } catch (error) {
            console.error(`Problem with save-data storage KEY:${key}`);
            
          }

        }
      }
    }


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