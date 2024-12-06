import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useAddMutation = () => {
  const queryClient = useQueryClient();
  // TODO: 선택: useMutation을 useTodoMutation 커스텀훅으로 정리해 보세요.
  const addMutation = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return { addMutation };
};

export default useAddMutation;
