import { useQuery } from "@tanstack/react-query"

export const fetchReplies = async ({ commentId, slug }) => {
    const response = await fetch(`/api/comment/${commentId}/replies?slug=${slug}`);
    if (!response.ok) {
        throw new Error("Erro ao carregar comentário");
    }

    return response.json();
};

export const useFetchReplies = ({ commentId, slug }) => {
    return useQuery({
        queryKey: ["replies", commentId, slug],
        queryFn: async () => fetchReplies({ commentId, slug }),
        enabled: !!commentId && !!slug,
        retry: 5,
    });
}
