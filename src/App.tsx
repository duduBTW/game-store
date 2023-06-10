import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import theme from "@/constants/theme";
import Pages from "@/components/pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Pages />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
