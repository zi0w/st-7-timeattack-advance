import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoMutation = () => {
  const queryClient = useQueryClient();

  const addTodo = async (newTodo) => {
    await todoApi.post("/todos", newTodo);
  };

  const addMutaion = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return { addMutaion };
};

export default useTodoMutation;
