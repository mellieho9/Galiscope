'use client'

import { UserProvider } from '@/contexts/UserContextProvider';
import { theme } from '@/utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
