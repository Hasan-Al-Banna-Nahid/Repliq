import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authorization/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useOrder = () => {
  const { user, isLoading } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: order = [] } = useQuery({
    queryKey: ["order", user?.email],
    enabled: !isLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/order?email=${user?.email}`);
      //   console.log("res from axios", res);
      return res.data;
    },
  });
  console.log(order);
  return [order, refetch];
};
export default useOrder;
