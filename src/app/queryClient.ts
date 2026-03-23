import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error.message, { position: "top-center", duration: 5_000 });
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
};
