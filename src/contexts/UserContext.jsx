import { createContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    setSub(authUser.attributes.sub);
    setUser(dbUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ sub, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;