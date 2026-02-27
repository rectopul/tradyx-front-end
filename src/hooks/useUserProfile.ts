import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiException } from "@/utils/api-errors";
import { getErrorMessage } from "../utils/api-errors";
import { userProfileService } from "@/services/auth";
import { Prisma } from "@/types/api";

export function useUserProfile() {
    const queryClient = useQueryClient();

    const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => userProfileService.getUserProfile(),
        retry: false,
    });

    const updatePasswordMutation = useMutation({
        mutationFn: (data: Prisma.UserUpdateInput) =>
            userProfileService.updatePassword(data),
        onSuccess: () => {
            // Invalidate e recarregue os dados do usuário se necessário
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
    });

    const getFieldError = (fieldName: string): string | undefined => {
        if (
            updatePasswordMutation.error instanceof ApiException &&
            updatePasswordMutation.error.errors
        ) {
            return updatePasswordMutation.error.errors[fieldName]?.[0];
        }
        return undefined;
    };

    return {
        userProfile,
        isLoadingProfile,
        updatePassword: updatePasswordMutation.mutate,
        isUpdatingPassword: updatePasswordMutation.isPending,
        updatePasswordError: updatePasswordMutation.error,
        getFieldError,
        getErrorMessage: () =>
            updatePasswordMutation.error
                ? getErrorMessage(updatePasswordMutation.error)
                : undefined,
    };
}
