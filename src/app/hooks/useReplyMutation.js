import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usereplyMutation = (slug) => {
    const queryClient = useQueryClient();
    const replyMutation = useMutation({
        mutationFn: (postData) => {
            return fetch("http://localhost:3000/api/thumbs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error!  status ${response.status}`);
                }

                return response.json();
            });
        },
        onMutate: async () => {
            const postQueryKey = ["post", post.slug]

            // cancelar queries em voo para detalhes do post
            await queryClient.cancelQueries(postQueryKey)

            const prevPost = queryClient.getQueryData(postQueryKey)

            // Atualizar um unico post

            if (prevPost) {
                queryClient.setQueryData(postQueryKey, {
                    ...prevPost,
                    likes: prevPost.likes + 1
                })
            }

            return { prevPost };
        },
        onSuccess: () => {
            if (currentPage) {
                queryClient.invalidateQueries(["post", currentPage])
            }
        },
        onError: (error, variables, context) => {
            console.error(
                `Erro ao salvar o thumbsUp para o slug: ${variables.slug}`,
                { error }
            );
            if (context.prevPost) {
                queryClient.setQueryData(["post", post.slug], context.prevPost);
            }
        },
    });

    return {
        muatet: ({ comment, text }) = replyMutation(({ comment, text })),
        status: replyMutation.status,
        error: replyMutation.error,
        isError: replyMutation.isError,
        isSuccess: replyMutation.isSuccess
    }
}