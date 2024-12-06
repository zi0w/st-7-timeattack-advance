import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodosQuery = () => {
  const fetchTodosData = async () => {
    const { data } = await todoApi.get("/todos");
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodosData,
  });

  return { data, isPending, error };
};

export default useTodosQuery;
