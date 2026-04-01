import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createQueryClient } from "./queryClient";
import { Toaster } from "@/shared/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = createQueryClient();

type ProvidersProps = {
  children?: ReactNode;
};

export const Providers = ({ children }: ProvidersProps): ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
