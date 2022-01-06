import React, { useContext } from "react";
import { Context } from 'cache-requests'

export const List = () => {

    const { updateStore, store } = useContext(Context);
  
    async function fetchUsers() {
        const res: any = await fetch("https://reqres.in/api/users?page=2");
        return res.json();
    }
  
    function onClick() {
        updateStore({
            fetcher: fetchUsers,
            url: "hello",
            checkForUpdate: false
        });
    }

    console.log("Store", store);

    return (
      <div>
        <button onClick={onClick}>Fetch Users</button>
        {store && store.hello && store.hello.data
        && store.hello.data.map((item: any) =>{
            return (
                <div key={item.id}>{item.email}</div>
            );
        })}
      </div>
    );
  
  }