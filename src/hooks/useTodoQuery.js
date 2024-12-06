import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoQuery = (id) => {
  const fetchDetailData = async () => {
    const { data } = await todoApi(`/todos/${id}`);
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: fetchDetailData,
  });

  return { data, isPending, error };
};

export default useTodoQuery;
