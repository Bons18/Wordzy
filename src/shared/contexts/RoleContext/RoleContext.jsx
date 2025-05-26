import { createContext } from "react";
import { useGetRoles } from "../../../features/Role/hooks/useGetRoles";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { roles, refetch} = useGetRoles();

  return (
    <RoleContext.Provider value={{ roles, refetch}}>
      {children}
    </RoleContext.Provider>
  );
};