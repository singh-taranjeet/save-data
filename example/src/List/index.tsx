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
          url: "https://reqres.in/api/users?page=2",
          checkForUpdate: true
      });
    }

    console.log("store", store);
  
    return (
      <div>
        <button onClick={onClick}>Fetch Users</button>

      </div>
    );
  
  }