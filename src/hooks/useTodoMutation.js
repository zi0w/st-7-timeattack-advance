import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: handleLike } = useMutation({
    mutationFn: async ({ id, currentLiked }) => {
      await todoApi.patch(`/todos/${id}`, { liked: !currentLiked });
    },
    onMutate: async ({ id, currentLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] }); // 쿼리 취소

      const previousTodos = queryClient.getQueryData(["todos"]); // 백업

      // 낙관적 업데이트
      queryClient.setQueryData(["todos"], (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !currentLiked } : todo
        )
      );
      return { previousTodos };
    },
    onError: (err, _, context) => {
      // 롤백
      queryClient.setQueriesData(["todos", context.previousTodos]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return { handleLike };
};

export default useTodoMutation;
