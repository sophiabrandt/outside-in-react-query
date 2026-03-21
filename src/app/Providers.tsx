import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createQueryClient } from "./queryClient";

const queryClient = createQueryClient();

type ProvidersProps = {
  children?: ReactNode;
};

export const Providers = ({ children }: ProvidersProps): ReactNode => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
