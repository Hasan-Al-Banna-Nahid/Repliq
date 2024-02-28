import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Authorization/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin = {}, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      console.log("Check Admin Email", user?.email);
      if (user?.email) {
        const res = await axiosSecure.get(`/admin/${user?.email}`);
        return res.data;
      }
      return false;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
