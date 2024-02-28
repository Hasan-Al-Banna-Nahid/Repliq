import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user, isLoading } = useContext(AuthContext);
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: Cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !isLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`);
      //   console.log("res from axios", res);
      return res.data;
    },
  });
  console.log(Cart);
  return [Cart, refetch];
};
export default useCart;
