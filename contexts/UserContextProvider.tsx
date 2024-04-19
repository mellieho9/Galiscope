import { User } from "@/types/user.types";
import api from "@/utils/axios/axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

const UserContext = createContext<UseQueryResult<User, unknown> | null>(null);

const useCurrentUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useQuery({
    queryKey: ["get-current-user"],
    queryFn: async () => {
      const { data } = await api.get<User>("api/user/current");
      return data;
    },
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useCurrentUser };
